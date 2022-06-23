declare module 'react-native-mlkit-ocr';

declare module Types {
  export type Point = {
    x: number;
    y: number;
  };

  export type CornerPoints = Array<Point | null>;

  export type Bounding = {
    left: number;
    top: number;
    height: number;
    width: number;
  };

  export type MLKTextElement = {
    text: string;
    cornerPoints: CornerPoints;
    bounding: Bounding;
  };

  export type MLKTextLine = {
    text: string;
    elements: Array<MLKTextElement>;
    cornerPoints: CornerPoints;
    bounding: Bounding;
  };

  export type MKLBlock = {
    text: string;
    lines: MLKTextLine[];
    cornerPoints: CornerPoints;
    bounding: Bounding;
  };

  export type MlkitOcrResult = MKLBlock[];
}
