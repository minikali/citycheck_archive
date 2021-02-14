/* eslint-disable camelcase */
import { GeojsonProperty } from "@/types";
import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { Popup } from "react-leaflet";
import { AUTHENTICATED } from "@/actionType/actionTypes";
import { AuthContext } from "@/context/AuthContext";
import useCard from "@/hooks/useCard";
import FeedbackModal from "@/components/FeedbackModal";
import SuggestModal from "@/components/SuggestModal";
import HistoryModal from "@/components/HistoryModal";
import "./style.scss";

interface Props {
  properties: GeojsonProperty;
}

const CardPopup = ({ properties }: Props) => {
  const {
    id,
    phase,
    title,
    description,
    updated_at,
    project_confirmations,
    english_project,
    french_project,
  } = properties;

  const { userStatus, userinfo, setToggle } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const { confirmCard, isSuggested } = useCard();
  const [modal, setModal] = useState({
    show: false,
    message: "",
  });
  const [showSuggest, setShowSuggest] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const update = new Date(updated_at).toLocaleDateString();
  const { idFr, idEn } = (() =>
    i18n.language === "fr"
      ? { idFr: id, idEn: english_project.id }
      : { idEn: id, idFr: french_project.id })();

  const isConfirmed = () => {
    if (!userinfo) return false;
    return (
      project_confirmations.filter(
        ({ user }) => user && user.toString() === userinfo.user.id.toString()
      ).length > 0
    );
  };
  const [confirmed, setConfirmed] = useState(isConfirmed());

  const handleConfirm = async () => {
    const res = await confirmCard(
      idFr,
      idEn,
      userinfo.user.id,
      userinfo.user.name
    );
    if (res) {
      setConfirmed(true);
      setModal({
        show: true,
        message: t("confirm_thanks"),
      });
    } else {
      setModal({
        show: true,
        message: t("confirm_error"),
      });
    }
  };

  const handleSuggestModif = async () => {
    const isSuggest = await isSuggested(idFr, idEn, userinfo.user.id);
    if (!isSuggest) setShowSuggest(true);
    else {
      setModal({
        show: true,
        message: t("suggest_modif_already"),
      });
    }
  };

  return (
    <Popup
      offset={[0, -15]}
      onOpen={() => console.log("open")}
      onClose={() => console.log("close")}
      autoClose={false}
      keepInView={true}
      autoPan={true}
      closeOnClick={false}
    >
      <Card className="card-popup">
        <Card.Header>
          <h2 className={`phase phase_${phase}`}>{t(`phase_${phase}`)}</h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="content">
            <p className="description">{description}</p>
            <p className="date">{`${t("updated_on")} ${update}`}</p>
          </div>

          <Card.Footer>
            {userStatus !== AUTHENTICATED && (
              <div className="unauthenticated">
                <p>{t("suggest_label_identify_interact")}</p>
                <Button
                  onClick={() => setToggle(true)}
                  title={t("login_btn")}
                  variant="link"
                >
                  <img
                    width={30}
                    height={30}
                    src="assets/images/login-icon.png"
                    alt="Login"
                  />
                </Button>
              </div>
            )}
            <div
              className={`card-buttons ${
                userStatus !== AUTHENTICATED && "disable"
              }`}
            >
              {!confirmed && (
                <Button
                  onClick={() => handleConfirm()}
                  disabled={userStatus !== AUTHENTICATED}
                >
                  {t("confirm_btn_lowercase")}
                </Button>
              )}
              <Button
                type="button"
                onClick={() => handleSuggestModif()}
                disabled={userStatus !== AUTHENTICATED}
              >
                {t("card_suggest_modif")}
              </Button>
            </div>
            <Button
              className="btn-history"
              variant="link"
              onClick={() => setShowHistory(true)}
              disabled={userStatus !== AUTHENTICATED}
            >
              {t("card_see_history")}
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
      <FeedbackModal
        show={modal.show}
        onHide={() => setModal({ show: false, message: "" })}
      >
        {modal.message}
      </FeedbackModal>
      <SuggestModal
        show={showSuggest}
        onHide={() => setShowSuggest(false)}
        idFr={idFr}
        idEn={idEn}
      />
      <HistoryModal
        show={showHistory}
        onHide={() => setShowHistory(false)}
        properties={properties}
      />
    </Popup>
  );
};

export default CardPopup;
