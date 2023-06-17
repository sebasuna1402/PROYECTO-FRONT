import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getCandidateById, unSetOffer } from "../../services/CandidateService";
import styles from "./candidateOffers.module.css";
import { SkillButton } from "./components/SkillButton";

export const CandidateOffers = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["candidateOffer"],
    queryFn: () => getCandidateById(id),
  });

  const unSetOfferMutation = useMutation({
    mutationKey: ["unSetOfferMutation"],
    mutationFn: unSetOffer,
    onSettled: () => queryClient.invalidateQueries("candidateOffer"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const { data: candidate } = data;

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  const handleUnSetOffer = (offerId) => {
    const offer = {
      candidatesId: candidate.id,
      offersId: offerId,
    };

    unSetOfferMutation.mutate(offer);
  };

  console.log(candidate);

  return (
    <div className="list-offers">
      {candidate.offers.map((offer) => (
        <div className="div-offer" key={offer.id}>
          <span className={styles.offer__title}>{offer.name}</span>
          <span className={styles.offer__date}>
            {new Date(offer.createdDate).toLocaleDateString()}
          </span>
          <span className={styles.offer__description}>{offer.description}</span>
          <span className={styles.offer__company}>
            Company: {offer.company?.name}
          </span>
          <div className="offer__list-skills">
            {offer?.skills.map((skill) => {
              return (
                <SkillButton
                  key={skill.id}
                  candidate={candidate}
                  disable
                  skill={skill}
                />
              );
            })}
          </div>
          <button
            onClick={() => {
              handleUnSetOffer(offer.id);
            }}
            className={styles.offer__btn_apply}
          >
            Unapply
          </button>
        </div>
      ))}
    </div>
  );
};
