import swal from "sweetalert";
import { http } from "../../../components/action/axiosInstance";
import tost from "../../../components/action/tost";

export async function RejectedReasons(values, refetch) {
  return swal("Write Rejected Reason here:", {
    content: "input",
    buttons: {
      cancel: true,
      confirm: "Confirm",
    },
  }).then((value) => {
    if (value !== null && value.trim() !== "") {
      http
        .post(`/admin/vendor-services/${values?.id}`, {
          reason: value,
          status: "rejected",
          commission: values?.commission,
          _method: "PUT",
        })
        .then((res) => {
          if (res.data?.data === "success") {
            tost(res?.data?.message);
            refetch();
          }
        });
    }
  });
}
