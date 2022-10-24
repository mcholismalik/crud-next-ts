export interface IEstimationPriceQuery {
  keyword: string;
  brandId?: string;
  categoryId?: string[];
  sizeId?: string;
  colorId?: string;
}

export interface IEstimationPriceResponse {
  picked: IEstimateionPriceCandidate;
  estimationCandidates: IEstimateionPriceCandidate[];
}

export interface IEstimateionPriceCandidate {
  finalPrice: number;
  facts: IEstimateionPriceCandidateFact[];
  decisionMethod: string;
  source: string;
  confidence: string;
}

export interface IEstimateionPriceCandidateFact {
  price: number;
  label: string;
  imageUri: string;
  sourceUri: string;
}

export interface IBrandsResponse {
  brands: IBrand[];
}

export interface IBrand {
  id: string;
  label: string;
}

export interface ICategoriesResponse {
  categories: ICategory[];
}

export interface ICategory {
  id: string;
  label: string;
  childs?: ICategory[];
}

export interface ISizesResponse {
  sizes: ISize[];
}

export interface ISize {
  id: string;
  label: string;
}

export interface IColorsResponse {
  colors: IColor[];
}

export interface IColor {
  id: string;
  label: string;
}
