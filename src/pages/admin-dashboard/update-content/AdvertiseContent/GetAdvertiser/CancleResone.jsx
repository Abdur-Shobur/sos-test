import swal from "sweetalert";
import { http } from "../../../../../components/action/axiosInstance";
import tost from "../../../../../components/action/tost";

export async function CancleResone(id, refetch) {
  return swal("Write Rejected Reason here:", {
    content: "input",
    buttons: {
      cancel: true,
      confirm: "Confirm",
    },
  }).then((value) => {
    if (value !== null && value.trim() !== "") {
      http
        .post(`/admin/advertise/cancel`, {
          reason: value,
          advertise_id: id?.advertise_id,
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
