export interface EmailTemplatesRequest {
  offset: number;
  limit: number;
  filter: string;
  emailTemplatesId: number;
}

export interface EmailTemplateIdRequest {
  id: number;
  emailTemplatesId: number;
}

export interface EmailTemplateRequest {
  id: number;
  templateName: string;
  templateContent: string;
}
