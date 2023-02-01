import React from "react";
import Image from "next/image";
import Modal from "@/components/organisms/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import marketClient from "@/lib/clients/marketClient";
import { codeFormSchema } from "@/lib/schemas/codeFormSchema";
import Input from "@/components/atoms/Input";
import Spinner from "@/components/atoms/Spinner";
import whatsappIcon from "@/images/logos/whatsapp.svg";

export default function useVerificationModal() {
  const [requestPayload, setRequestPayload] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState({
    isVerified: false,
    payload: null,
  });
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(codeFormSchema),
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    await marketClient
      .post("/api/verify-code", {
        code: data.code,
        phone: phone,
      })
      .then(({ data: response }) => {
        if (!response.valid) {
          throw new Error("Código inválido");
        } else {
          setLoading(false);
          setIsVerified({
            isVerified: response.valid,
            payload: requestPayload,
          });
          setOpen(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  const handleVerification = async (phoneNumber, payload) => {
    setPhone(phoneNumber);
    setOpen(true);
    setRequestPayload(payload);
  };

  const component = (
    <Modal open={open} setOpen={setOpen} size="sm">
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Image src={whatsappIcon} alt="whatsapp-icon" className="h-8 w-8" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Necesitamos saber que eres tu
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Enviamos un código de verificación a tu whatsapp. Por favor,
              ingresalo
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 px-8">
        <Input
          className="w-full py-4 text-xl sm:p-2 sm:text-md text-center"
          type="code"
          errors={errors}
          placeholder="Ingresa el código"
          pattern="\d*"
          {...register("code")}
        />

        <button
          type="button"
          className="mt-4 inline-flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:text-sm"
          onClick={handleSubmitForm(handleSubmit)}
        >
          {loading ? <Spinner /> : "Verificar"}
        </button>
      </div>
    </Modal>
  );
  return {
    isVerified,
    showVerificationModal: handleVerification,
    verificationModal: component,
  };
}
