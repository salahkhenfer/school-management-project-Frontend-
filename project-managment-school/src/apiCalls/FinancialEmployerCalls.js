import axios from "axios";

const getEmployerFinancials = async () => {
  try {
    const response = await axios.get(
      "https://servertest.eltatwir.com/api/PaymentEmployer/getAllPaymentEmployer",

      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.payments;
  } catch (err) {
    console.error("Failed to get financial:", err);
  }
};

const addPaymentEmployer = async (employerId, amount) => {
  try {
    const response = await axios.post(
      "https://servertest.eltatwir.com/api/PaymentEmployer/addPaymentEmployer",
      {
        employerName: employerId,
        amount: parseInt(amount),
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to add payment:", err);
  }
};

const searchEmployerPayment = async (employerName) => {
  try {
    const response = await axios.post(
      "https://servertest.eltatwir.com/api/PaymentEmployer/searchPaymentEmployer",
      {
        employerName,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.payments;
  } catch (err) {
    console.error("Failed to get payment:", err);
  }
};

export { addPaymentEmployer, getEmployerFinancials, searchEmployerPayment };
