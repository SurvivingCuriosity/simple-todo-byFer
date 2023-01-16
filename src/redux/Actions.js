import { fetchUserPublicData } from "../api/apiCalls";

//USERDATA
export const fetchPublicUserData = (username) => async (dispatch) => {
    dispatch({ type: "GET_USER_PUBLIC_DATA" });
    const res = await fetchUserPublicData(username);
    /*
        res={
            data: {success : true, userPublicData}
            status: XXX
        }
    */
    if (res?.data?.success === true) {
        dispatch({ type: "GET_USER_PUBLIC_DATA_SUCCESS", data: res.data.userPublicData });
    } else {
        dispatch({ type: "GET_USER_PUBLIC_DATA_FAIL", error: res.data.error });
    }
};
