export interface ProductType {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: DimensionsType
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: ReviewType[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: MetaType
  images: string[]
  thumbnail: string
}

export interface DimensionsType {
  width: number
  height: number
  depth: number
}

export interface ReviewType {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface MetaType {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}
