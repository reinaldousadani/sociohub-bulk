enum WebflowFieldType {
    bool = "Bool",
    color = "Color",
    date = "Date",
    extFileRef = "ExtFileRef",
    set = "Set",
    imageRef = "ImageRef",
    itemRef = "ItemRef",
    itemRefSet = "ItemRefSet",
    link = "Link",
    number = "Number",
    option = "Option",
    plainText = "PlainText",
    richText = "RichText",
    video = "Video"
}

interface IWebflowValidation {
    maxLength: number,
    minLength: number,
    minimum: number,
    maximum: number,
    maxSize: number,
    decimalPlaces: number,
    singleLine: boolean,
    options: string[],
    format: string,
    precision: number,
    allowNegative: boolean,
    collectionId: string
}

export interface IWebflowField {
    id: string,
    slug: string,
    name: string,
    type: WebflowFieldType,
    editable: boolean,
    required: boolean,
    validations: IWebflowValidation
}

export interface IWebflowCollection {
    _id: string,
    lastUpdated: string,
    createdOn: string,
    name: string,
    slug: string,
    singularName: string,
    fields: IWebflowField[]
}