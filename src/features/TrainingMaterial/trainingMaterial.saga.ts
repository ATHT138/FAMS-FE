import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { ListResponse, Material, MaterialParams } from "../../models";
import { materialActions } from "./trainingMaterial.slice";
import { create, getByContentId } from "../../constants/trainingMaterialApi";

function* fetchMaterialList(action: PayloadAction<MaterialParams>) {
    try {
        const response: ListResponse<Material> = yield call(
            getByContentId,
            action.payload
        );
        yield put(
            materialActions.fetchListSuccess({
                data: response.data,
                currentPage: response.currentPage,
                totalPage: response.totalPage
            })
        );
        console.log("Fetch complete: ", response);
    } catch (error) {
        console.log("Fetch failed: ", error);
        yield put(materialActions.fetchListFail());

    }
}
// function* fetchMaterialById(action: PayloadAction<string>) {
//     try {
//         const response: Material = yield call(
//             getById,
//             action.payload
//         );
//         yield put(materialActions.fetchMaterialByIdSuccess(response));

//     } catch (error) {
//         console.log("Fetch failed: ", error);
//         yield put(materialActions.fetchMaterialByIdFail);
//     }
// }
function* createMaterial(action: PayloadAction<MaterialParams>) {
    try {
        const response: Material = yield call(
            create,
            action.payload
        );
        yield put(materialActions.createSuccess(response));

    } catch (error) {
        console.log("Fetch failed: ", error);
        yield put(materialActions.createFail);
    }
}

export default function* programSaga() {
    yield takeLatest(materialActions.fetchList, fetchMaterialList);
    yield takeLatest(materialActions.create, createMaterial);
}