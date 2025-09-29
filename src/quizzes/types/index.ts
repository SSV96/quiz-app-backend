export enum BlockEnum {
  HEADING = 'HEADING',
  QUESTION = 'QUESTION',
  BUTTON = 'BUTTON',
  FOOTER = 'FOOTER',
}

export enum QuestionKindEnum {
  SINGLE = 'SINGLE',
  MULTI = 'MULTI',
  TEXT = 'TEXT',
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionProperties {
  title?: string;
  kind?: QuestionKindEnum;
  textAnswer?: string;
  options?: QuestionOption[];
  correctOptionIds?: string[];
}

export interface QuestionBlock {
  id: string;
  type: BlockEnum.QUESTION;
  properties: QuestionProperties;
}

export interface ITextBlockProperties {
  text?: string;
}

export interface TextBlock {
  id: string;
  type: BlockEnum.HEADING | BlockEnum.FOOTER;
  properties: ITextBlockProperties;
}

export interface IButtonBlockProperties {
  nextLabel: string;
  previousLabel: string;
  submitLabel: string;
}

export interface ButtonBlock {
  id: string;
  type: BlockEnum.BUTTON;
  properties: IButtonBlockProperties;
}

export type TQuizBlock = QuestionBlock | TextBlock | ButtonBlock ;
