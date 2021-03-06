import api from './api';
import { catchGitHubNotFound } from '../utils/exceptions';
import Repository from '../entities/Repository';

class GetRepositoriesService {
  public async execute(username: string): Promise<Repository[]> {
    let response;
    try {
      response = await api.get(`/users/${username}/repos`);
    } catch (error) {
      throw catchGitHubNotFound(error);
    }
    let repositories: Repository[] = response.data;

    repositories = repositories.map(item => {
      const {
        id,
        name,
        full_name,
        description,
        html_url,
        language,
        created_at,
      } = item;

      return {
        id: String(id),
        name,
        full_name,
        description,
        html_url,
        created_at,
        language,
      };
    });

    return repositories;
  }
}

export default GetRepositoriesService;
