import axios from 'axios';
import crypto from 'crypto';
import AppError from '../errors/AppError';
import EditTeacherService from './EditTeacherService';

function encrypt(word: string): string {
  const cryptoAlgorithm = process.env.CRYPTO_ALGORITHM;
  const cryptoSecret = process.env.CRYPTO_SECRET;
  const cryptoType = 'hex';

  if (!cryptoAlgorithm || !cryptoSecret) {
    throw new AppError('Internal server error.', 500);
  }

  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(cryptoAlgorithm, cryptoSecret, iv);

  cipher.update(word);
  return cipher.final(cryptoType);
}

class RegisterTeacherGithubService {
  async execute(code: string): Promise<void> {
    const clientId = process.env.GITHUB_APP_CLIENT_ID;
    const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new AppError('Internal server error.', 500);
    }

    let tokenRequest;
    try {
      tokenRequest = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
    } catch (error) {
      throw new AppError('Not able to get github access token.', 401);
    }

    const accessToken = tokenRequest.data.access_token;
    if (!accessToken) {
      throw new AppError('Not able to get github access token.', 401);
    }

    let response;
    try {
      response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
    } catch (error) {
      throw new AppError('Unable to get user information on GitHub api.', 500);
    }
    const { name, login, avatar_url } = response.data;

    const encryptedToken = encrypt(accessToken);

    const editTeacher = new EditTeacherService();
    await editTeacher.execute(login, {
      name,
      avatar_url,
      github_token: encryptedToken,
    });
  }
}

export default RegisterTeacherGithubService;
