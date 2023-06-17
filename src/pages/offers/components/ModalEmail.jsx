import React, { useContext, useEffect, useState } from "react";
import styles from "./ModalEmail.module.css";
import { useMutation, useQuery } from "react-query";
import { getCandidates, setOffer } from "../../../services/CandidateService";
import { context } from "../context/OfferContext";

// custom modal
export const ModalEmail = ({ open, onClose }) => {
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const offerContext = useContext(context);

  const [input, setInput] = useState("");

  const {
    data: candidates,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getSingleCandidate"],
    queryFn: () => getCandidates(),
  });

  const setOfferMutation = useMutation({
    mutationKey: ["setOfferMutation"],
    mutationFn: setOffer,
  });

  const handleApply = () => {
    setMessageColor("red");

    if (!candidates.data) {
      setMessage("Sin candidatos");
      return;
    }

    if (input === "") {
      setMessage("Please fill the input field");
      return;
    }

    const candidate = candidates.data.find(
      (candidate) => candidate.email === input.trim()
    );

    if (!candidate) {
      setMessage("Candidate not found");
      return;
    }

    setMessage(`${candidate.email}`);
    setMessageColor("green");

    const offer = {
      candidatesId: candidate.id,
      offersId: offerContext.id,
    };
    setOfferMutation.mutate(offer);

    onClose();
  };

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>{error}</div>;

  return (
    <>
      {open ? (
        <div className={styles.container}>
          <div className={styles.modal_email}>
            <h2 className={styles.modal_email__title}>Apply this offer!</h2>
            <p
              className={styles.modal_email__message}
              style={{ color: messageColor }}
            >
              {message}
            </p>
            <div className={styles.modal_email__form}>
              <input
                className={styles.modal_email__input}
                type="text"
                placeholder="Email"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button onClick={handleApply} className={styles.modal_email__btn}>
                Confirm
              </button>
              <button
                onClick={onClose}
                className={styles.modal_email__btn_close}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
