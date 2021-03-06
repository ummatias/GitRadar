interface StudentRequest {
  github_id: string;
}

interface addJobRequest {
  queueName: string;
  jobName: string;
  job?: StudentRequest;
  opts?: {
    removeOnComplete: boolean;
  };
}

interface registerQueueRequest {
  queueName: string;
}

interface QueueProvider {
  register({ queueName }: registerQueueRequest): void;
  add({ queueName, job, jobName, opts }: addJobRequest): void;
  setUI(): void;
}

export { QueueProvider, addJobRequest, registerQueueRequest, StudentRequest };
