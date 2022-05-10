export interface Car {
    id: string;
    modelName: string;
    bodyType: BodyType;
    modelType: ModelType;
    imageUrl: string;
}

export enum ModelName {
    XC90 = "XC90 Recharge",
    XC60 = "XC60 Recharge",
    XC40 = "XC40 Recharge",
    V90 = "V90 Recharge",
    V60 = "V60 Recharge",
    S90 = "S90 Recharge",
    S60 = "S60 Recharge",
}

export enum BodyType {
    SUV = "SUV",
    ESTATE = "Estate",
    SEDAN = "Sedan",
}

export enum ModelType {
    PLUGIN_HYBRID = "plug-in hybrid",
    PURE_ELECTRIC = "pure electric",
}
