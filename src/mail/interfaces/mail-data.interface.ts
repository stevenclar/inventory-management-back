export interface MailDataAttachment {
  filename: string;
  content?: any;
  path?: string | undefined;
  contentType?: string | undefined;
  cid?: string | undefined;
  encoding?: string | undefined;
  contentDisposition?: 'attachment' | 'inline' | undefined;
  href?: string | undefined;
}

export interface MailData<T = never> {
  to: string;
  data: T;
}
