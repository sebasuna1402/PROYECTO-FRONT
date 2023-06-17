import { useQuery } from "react-query";
import { getOffers } from "../../services/OfferService";
import { SkillButton } from "../candidates/components/SkillButton";
import styles from "./ListOffers.module.css";
import { ModalEmail } from "./components/ModalEmail";
import { useState } from "react";
import { context } from "./context/OfferContext";

const ListOffers = () => {
  const [open, setOpen] = useState(false);
  const [selectedOffer, setselectedOffer] = useState(null);

  const { data, isLoading, isError } = useQuery("offers", getOffers, {
    staleTime: 5000,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <context.Provider value={selectedOffer}>
      <div className="list-offers">
        {data.data.map((offer) => (
          <div className="div-offer" key={offer.id}>
            <span className={styles.offer__title}>{offer.name}</span>
            <span className={styles.offer__date}>
              {new Date(offer.createdDate).toLocaleDateString()}
            </span>
            <span className={styles.offer__description}>
              {offer.description}
            </span>
            <span className={styles.offer__company}>
              Company: {offer.company?.name}
            </span>
            <div className="offer__list-skills">
              {offer?.skills.map((skill) => {
                return <SkillButton key={skill.id} disable skill={skill} />;
              })}
            </div>
            <button
              onClick={() => {
                setselectedOffer(offer);
                setOpen(true);
              }}
              className={styles.offer__btn_apply}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
      <ModalEmail open={open} onClose={onCloseModal} />
    </context.Provider>
  );
};

export default ListOffers;
