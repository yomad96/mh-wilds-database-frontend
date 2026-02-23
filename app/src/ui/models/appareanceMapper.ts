import type {Appareance} from "@/domain/entities/appareance.ts";
import type {AppareanceFormModelType, AppareanceSubmitModelType} from "@/ui/models/appareanceFormModel.ts";

export const toAppareanceFormModel = (appareance: Appareance): AppareanceFormModelType => {
    return {
        id: appareance.id,
        name: appareance.name ?? null,
        description: appareance.description ?? undefined,
        images: appareance.images ? appareance.images.join(', ') : '',
        equipments: [],
    }
}

export const toAppareanceSubmitModel = (appareanceFormModel: AppareanceFormModelType): AppareanceSubmitModelType => {
    return {
        name: appareanceFormModel.name,
        images: appareanceFormModel.images,
        equipments: appareanceFormModel.equipments,
    }
}