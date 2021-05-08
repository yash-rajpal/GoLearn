// Following contains the response details for Google Vision API
// Refer : https://cloud.google.com/vision/docs/fulltext-annotations
// We need to focus only on the `fullTextAnnotation` field as `textAnnotations` is an older field
// Pages→Blocks→Paragraphs→Words→Symbols

export type Language = {
  languageCode: string;
};

export type Property = {
  detectedLanguages: Language[];
};

/**
 * If the x or y coordinate is not provided, take it as zero
 */
export type Coordinate = {
  x?: number;
  y?: number;
};

export type BoundingBox = {
  vertices: Coordinate[];
};

export type Symbols = {
  property: Property;
  boundingBox: BoundingBox;
  text: string;
};

export type Word = {
  property: Property;
  boundingBox: BoundingBox;
  symbols: Symbols[];
};

export type Paragraph = {
  property: Property;
  boundingBox: BoundingBox;
  words: Word[];
};

export type Block = {
  property: Property;
  boundingBox: BoundingBox;
  paragraphs: Paragraph[];
  blockType: 'TEXT';
};

export type Page = {
  property: Property;
  width: number;
  height: number;
  blocks: Block[];
};

export type FullTextAnnotation = {
  pages: Page[];
  text: string;
};

export type TextAnnotation = {
  locale?: 'en';
  description: string;
  boundingPoly: BoundingBox;
};

export type GoogleResponse = {
  textAnnotations: TextAnnotation[];
  fullTextAnnotation: FullTextAnnotation;
};

export type VisionAPIResponse = {
  responses: GoogleResponse[];
};

/**
 * Do not include base64 in  the string
 */
export type GoogleBase64 = {
  content: string;
};

export type GoogleRequest = {
  requests: Array<{
    image: GoogleBase64;
    features: {
      type: 'TEXT_DETECTION';
    };
  }>;
};
