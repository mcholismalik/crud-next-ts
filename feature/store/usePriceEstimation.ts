import create from 'zustand';
import { IProduct } from '../../components/product/Product';
import { LANG } from '../../utils/config';
import { DEFAULT_FILTERS } from '../../utils/constant';
import { formatLocalePrice } from '../../utils/format';
import { paginate } from '../../utils/pagination';
import { IOption, IOptionForm } from '../model/base';
import {
  IBrand,
  ICategory,
  IColor,
  IEstimateionPriceCandidate,
  IEstimateionPriceCandidateFact,
  IEstimationPriceQuery,
  IEstimationPriceResponse,
  ISize
} from '../model/priceEstimation';

interface IEstimateQueryStore {
  query: IEstimationPriceQuery;
  filters: IOptionForm[];
  setKeyword: (keyword: string) => void;
  setFilters: (filters: IOptionForm[]) => void;
}

export const useEstimateQueryStore = create<IEstimateQueryStore>((set) => ({
  query: {
    keyword: ''
  },
  filters: [],
  setKeyword: (keyword: string) => {
    set((state) => ({
      query: {
        ...state.query,
        keyword: keyword
      }
    }));
  },
  setFilters: (filters: IOptionForm[]) => {
    set((state) => {
      let query: IEstimationPriceQuery = { keyword: state.query.keyword };
      filters.map((v) => {
        if (v.type === 'brand') query.brandId = v.id;
        if (v.type === 'category') {
          if (!Array.isArray(query.categoryId)) query.categoryId = [];
          query.categoryId?.push(v.id);
        }
        if (v.type === 'size') query.sizeId = v.id;
        if (v.type === 'color') query.colorId = v.id;
      });

      return {
        query,
        filters
      };
    });
  }
}));

interface IEstimateResponseStore {
  estimationPrice: IEstimationPriceResponse;
  products: IProduct[];
  paginateProducts: IProduct[];
  page: number;
  totalPage: number;
  limit: number;
  setEstimationPrice: (estimationPrice?: IEstimationPriceResponse) => void;
  setProducts: () => void;
  setPage: (page: number) => void;
}

export const initialEstimateResponseStore = {
  estimationPrice: {
    picked: {
      finalPrice: 0,
      facts: [],
      decisionMethod: '',
      source: '',
      confidence: ''
    },
    estimationCandidates: []
  },
  products: [],
  paginateProducts: [],
  page: 1,
  totalPage: 0,
  limit: 10
};
export const useEstimateResponseStore = create<IEstimateResponseStore>((set) => ({
  ...initialEstimateResponseStore,
  setEstimationPrice: (estimationPrice?: IEstimationPriceResponse) => {
    set((state) => ({
      estimationPrice
    }));
  },
  setProducts: () => {
    set((state) => {
      const data = state.estimationPrice;
      const products: IProduct[] = [];

      data?.estimationCandidates.map((candidate: IEstimateionPriceCandidate) => {
        candidate?.facts.map((fact: IEstimateionPriceCandidateFact) => {
          const product: IProduct = {
            source: candidate.source,
            label: fact.label,
            price: formatLocalePrice(LANG, fact.price),
            sourceURL: fact.sourceUri,
            imageURL: fact.imageUri
          };
          products.push(product);
        });
      });
      const paginateProducts = paginate<IProduct>(products, state.limit, state.page);
      return {
        products,
        paginateProducts,
        totalPage: Math.ceil(products.length / state.limit)
      };
    });
  },
  setPage: (page: number) => {
    set((state) => {
      const paginateProducts = paginate<IProduct>(state.products, state.limit, page);
      return {
        paginateProducts,
        page
      };
    });
  }
}));

interface IFilterOptionStore {
  brands: IOption[];
  categories: IOption[];
  filteredCategories: IOption[];
  sizes: IOption[];
  colors: IOption[];
  filterOptions: IOption[];
  placeholder: string;

  setBrands: (brands: IBrand[]) => void;
  setCategories: (categories: ICategory[]) => void;
  setFilteredCategories: (categories: IOption[]) => void;
  setSizes: (sizes: ISize[]) => void;
  setColors: (colors: IColor[]) => void;
  setFilterOptions: (filterOptions: IOption[]) => void;
  setPlaceholder: (placeholder: string) => void;
}
export const useFilterOptionsStore = create<IFilterOptionStore>((set) => ({
  brands: [],
  categories: [],
  filteredCategories: [],
  sizes: [],
  colors: [],
  filterOptions: DEFAULT_FILTERS,
  placeholder: DEFAULT_FILTERS[0].label,
  setBrands: (brands: IBrand[]) => {
    set((state) => {
      const brandOptions: IOption[] = brands.map((e) => ({
        id: e.id,
        type: 'brand',
        label: `brand: ${e.label}`
      }));
      return {
        brands: brandOptions
      };
    });
  },
  setCategories: (categories: ICategory[]) => {
    set((state) => {
      const cb = (e: ICategory): IOption => {
        return {
          id: e.id,
          type: 'category',
          label: `category: ${e.label}`,
          childs: e.childs && e.childs.map(cb)
        };
      };
      const categoryOptions: IOption[] = categories.map(cb);

      return {
        categories: categoryOptions
      };
    });
  },
  setFilteredCategories: (categories: IOption[]) => {
    set((state) => {
      return {
        filteredCategories: categories
      };
    });
  },
  setSizes: (sizes: ISize[]) => {
    set((state) => {
      const sizeOptions: IOption[] = sizes.map((e) => ({
        id: e.id,
        type: 'size',
        label: `size: ${e.label}`
      }));
      return {
        sizes: sizeOptions
      };
    });
  },
  setColors: (colors: IColor[]) => {
    set((state) => {
      const colorOptions: IOption[] = colors.map((e) => ({
        id: e.id,
        type: 'color',
        label: `color: ${e.label}`
      }));
      return {
        colors: colorOptions
      };
    });
  },
  setFilterOptions: (filterOptions: IOption[]) => {
    set((state) => {
      return {
        filterOptions
      };
    });
  },
  setPlaceholder: (placeholder: string) => {
    set((state) => {
      return {
        placeholder
      };
    });
  }
}));
