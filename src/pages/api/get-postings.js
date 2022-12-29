export default async function handler(req, res) {
  try {
    const { data: updatedLoan } = await updateBanqiLoanTicketById(
      req.body.id,
      req.body
    );

    res.status(200).json(updatedLoan);
  } catch (error) {
    return res?.status(error.status).json({
      message: error.message,
    });
  }
}
