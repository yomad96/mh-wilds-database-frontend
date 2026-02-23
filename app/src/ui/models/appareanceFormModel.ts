export type AppareanceFormModelType = {
    id: string;
    name: string;
    description: string | undefined;
    images: string;
    equipments: string[];
}

export type AppareanceSubmitModelType = {
    name: string;
    images: string;
    equipments: string[];
}