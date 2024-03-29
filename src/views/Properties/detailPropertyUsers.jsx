import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
import { Steps, Hints } from "intro.js-react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  ButtonIcon,
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
  LoaderAction,
} from "./constants/styleConstants";
import {
  Content,
  ContainerDown,
  TabsProperty,
  Tab,
  GeneralCard,
  Card,
  ContentRight,
  SharedByUser,
  SeparateServices,
} from "./constants/styleDashboardProperties";
import {
  IconTenant,
  IconShare,
  IconHeart,
  IconEditSquare,
  IconDelete,
} from "../../assets/iconSvg";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../utils/actions/actions";
import SectionAmenities from "./sectionsDetail/sectionAmenities";
import SectionCarouselInfo from "./sectionsDetail/sectionCarouselHz";
import SectionFeatures from "./sectionsDetail/sectionFeatures";
import SectionLocation from "./sectionsDetail/sectionLocation";
import SectionPolicy from "./sectionsDetail/sectionPolicy";
import SectionPublicProperty from "./sectionsDetail/sectionPublicProperty";
import SectionServiceAgent from "./sectionsDetail/sectionServiceAgent";
import ContextProperty from "./context/contextProperty";
import SectionDocuments from "./sectionsDetail/sectionDocuments";
import SectionApplicants from "./sectionsDetail/sectionApplicants";
import SectionAssociationProperty from "./sectionsDetail/sectionAssociationProperty";
import SectionAgents from "./sectionsDetail/sectionAgents";
import SectionAssociationApplicant from "./sectionsDetail/sectionAssociationApplicant";
import SectionTimeLine from "./sectionsDetail/sectionTimeLine";
import CustomModalMessage from "../../components/customModalMessage";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow.svg";
import { ReactComponent as IconProperty } from "../../assets/iconSvg/svgFile/iconProperties.svg";
import { ReactComponent as IconOwner } from "../../assets/iconSvg/svgFile/iconOwner.svg";
import CustomValidationUser from "../../components/CustomValidationUser";
import SectionAreYouOwner from "./sectionsDetail/sectionAreYouOwner";
import { stepAgent, stepAgentTop } from "./constants/stepsProperty";
import SectionPropertyDocuments from "./sectionsDetail/sectionPropertyDocuments";

const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  p {
    color: rgba(78, 75, 102, 0.45);
    font-weight: 700;
    text-align: center;
  }
`;

const dataTabsProperty = [
  {
    id: "1",
    text: "Características",
  },
  {
    id: "2",
    text: "Ubicación",
  },
  {
    id: "3",
    text: "Amenidades",
  },
];

const DetailPropertyUsers = (props) => {
  const { match, callGlobalActionApi, dataProfile, history, dataUserRedirect } =
    props;
  const { params } = match;
  const [idProperty, setIdProperty] = useState(params.idProperty);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [isOpenComponent, setIsOpenComponent] = useState(null);
  const [isVisibleIntro, setIsVisibleIntro] = useState(false);
  const [isVisibleHints, setIsVisibleHints] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [dataDetailApplicants, setDataDetailApplicants] = useState([]);
  const [dataDetailAdvisers, setDataDetailAdvisers] = useState([]);
  const [dataDetailAmenities, setDataDetailAmenities] = useState([]);
  const [dataDetailDocuments, setDataDetailDocuments] = useState([]);
  const [dataPropertyDocuments, setDataPropertyDocuments] = useState([]);
  const [dataDetailImages, setDataDetailImages] = useState([]);
  const [dataApplicationMethod, setDataApplicationMethod] = useState([]);
  const [dataEnableIntro, setDataEnableIntro] = useState([]);
  const [tabSelect, setTabSelect] = useState("1");
  const [dataTimeLine, setDataTimeLine] = useState([]);
  const stepsRef = useRef(null);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetCustomerTimeLine = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          idProperty: data.idProperty,
          idApartment: data.idApartment,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_TIME_LINE
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataTimeLine(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetPropertyById = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier: null,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_PROPERTY_BY_ID
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      handlerCallGetCustomerTimeLine({
        idProperty: responseResult.idProperty,
        idApartment: responseResult.idApartment,
      });
      handlerCallGetDocRequiredByProperty({
        idProperty: responseResult.idProperty,
        idApartment: responseResult.idApartment,
      });
      setDataDetail(responseResult);
      if (
        responseResult.hasRegisteredProperty === false &&
        dataProfile.idUserType === 4
      ) {
        setDataEnableIntro(
          window.screen.width > 1160 ? stepAgent : stepAgentTop
        );
        if (window.screen.width > 1160) {
          setIsVisibleIntro(true);
        } else {
          setIsVisibleHints(true);
        }
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetPropertyPictures = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier: null,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_PROPERTY_PICTURES
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataDetailImages(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetApplicantsByProperty = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier: null,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_APPLICANTS_BY_PROPERTY
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataDetailApplicants(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAmenitiesByProperty = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier: null,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_AMENITIES_BY_PROPERTY
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataDetailAmenities(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetDocumentsByProperty = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier: null,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_DOCUMENTS_BY_PROPERTY
      );

      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataDetailDocuments(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetDocRequiredByProperty = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty: data.idProperty,
          idApartment: data.idApartment,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_DOC_REQUIRED_BY_PROPERTY
      );

      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataPropertyDocuments(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAdvisersInProperty = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier: null,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_ADVISERS_IN_PROPERTY
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataDetailAdvisers(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllApplicationMethods = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          type: 1,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_APPLICATION_METHODS
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataApplicationMethod(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallUpdateProperty = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idProperty,
        API_CONSTANTS.PROPERTY.UPDATE_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallUpdatePropertyApplicationMethod = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idProperty,
        API_CONSTANTS.PROPERTY.UPDATE_PROPERTY_IN_APPLICATION_METHOD,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSetFavoriteProperty = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.SET_FAVORITE_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const copiarAlPortapapeles = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {}

    document.body.removeChild(textArea);
  };

  const copyTextToClipboard = (num) => {
    if (!navigator.clipboard) {
      copiarAlPortapapeles(num);
      return;
    }
    navigator.clipboard.writeText(num).then(
      () => {
        frontFunctions.showMessageStatusApi(
          "Link copiado correctamente",
          GLOBAL_CONSTANTS.STATUS_API.SUCCESS
        );
      },
      (err) => {}
    );
  };

  const handlerParseBackArray = (array) => {
    let arrayDocuments =
      isNil(array) === false && isEmpty(array) === false
        ? JSON.parse(array)
        : [];

    if (isEmpty(arrayDocuments) === false) {
      arrayDocuments = arrayDocuments.map((row) => {
        return {
          idDocument: row.idDocument,
          bucketSource: row.bucketSource,
          isMain: row.isMain,
        };
      });
    }
    return arrayDocuments;
  };

  const handlerCallApplyToProperty = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.APPLY_TO_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallAsyncApis = () => {
    handlerCallGetPropertyById();
    handlerCallGetApplicantsByProperty();
    handlerCallGetDocumentsByProperty();
    handlerCallGetAdvisersInProperty();
  };

  const handlerCallAsyncApisInit = () => {
    handlerCallGetAllApplicationMethods();
    handlerCallGetPropertyById();
    handlerCallGetPropertyPictures();
    handlerCallGetApplicantsByProperty();
    handlerCallGetAmenitiesByProperty();
    handlerCallGetDocumentsByProperty();
    handlerCallGetAdvisersInProperty();
  };

  useEffect(() => {
    setIdProperty(params.idProperty);
  }, [params.idProperty]);

  useEffect(() => {
    handlerCallAsyncApisInit();
  }, [idProperty]);

  useEffect(() => {
    if (isEmpty(dataDetail) === false && isNil(isOpenComponent) === true) {
      handlerCallGetCustomerTimeLine({
        idProperty: dataDetail.idProperty,
        idApartment: dataDetail.idApartment,
      });
    }
  }, [isOpenComponent]);

  return (
    <>
      {isEmpty(dataDetail) === false && (
        <Content id="detail-property-user">
          <Steps
            enabled={isOpenComponent === 7 || isVisibleIntro === true}
            steps={dataEnableIntro}
            initialStep={0}
            options={{
              nextLabel: " >> ",
              prevLabel: " << ",
              doneLabel: "Finalizar",
              hideNext: false,
            }}
            ref={stepsRef}
            onBeforeChange={(nextStepIndex) => {}}
            onComplete={() => {
              setIsOpenComponent(null);
              setIsVisibleIntro(false);
              // const elementDad = document.getElementById(
              //   "detail-property-user"
              // );
              // elementDad.scrollTop = 0;
            }}
            onExit={() => {
              setIsOpenComponent(null);
              setIsVisibleIntro(false);
              // const elementDad = document.getElementById(
              //   "detail-property-user"
              // );
              // elementDad.scrollTop = 0;
            }}
          />
          <Hints
            enabled={isVisibleHints}
            hints={dataEnableIntro}
            options={{
              hintButtonLabel: "Entendido",
            }}
          />
          <ContextProperty.Provider
            value={{
              isOpenComponent,
              dataDetail,
              dataDetailApplicants,
              dataDetailAdvisers,
              dataDetailAmenities,
              dataDetailDocuments,
              dataPropertyDocuments,
              history,
              updateProperty: async (data) => {
                try {
                  await handlerCallUpdateProperty(data);
                } catch (error) {
                  throw error;
                }
              },
              updatePropertyApplicationMethod: async (data) => {
                try {
                  await handlerCallUpdatePropertyApplicationMethod(data);
                } catch (error) {
                  throw error;
                }
              },
              onCloseComponent: () => {
                setIsOpenComponent(null);
              },
              onGetConfigSteps: (config) => {
                setDataEnableIntro(config);
              },
              getById: () => {
                handlerCallAsyncApis();
              },
            }}
          >
            <SectionAreYouOwner
              visibleModal={isOpenComponent == 5}
              onClose={() => {
                setIsOpenComponent(null);
              }}
            />
            <CustomModalMessage
              isModalVisible={isVisibleDelete}
              title="Eliminar propiedad"
              subTitle="¿Estás seguro que deseas eliminar la propiedad?"
              mainText="Al eliminar la propiedad perderás toda la información asociada a ella."
              icon={
                <InfoCircleOutlined
                  style={{
                    fontSize: 100,
                    color: "var(--color-primary)",
                  }}
                />
              }
              labelLeft="Aceptar"
              labelRight="Cancelar"
              onClose={() => {
                setIsVisibleDelete(false);
              }}
              onClickRight={() => {
                setIsVisibleDelete(false);
              }}
              onClickLeft={async () => {
                try {
                  await handlerCallUpdateProperty({
                    idApartment: dataDetail.idApartment,
                    isActive: false,
                    apartmentDocuments: handlerParseBackArray(
                      dataDetail.apartmentDocuments
                    ),
                  });
                  if (
                    isNil(dataUserRedirect) === false &&
                    isEmpty(dataUserRedirect.backPathDirect) === false &&
                    isNil(dataUserRedirect.backPathDirect) === false
                  ) {
                    history.push(dataUserRedirect.backPathDirect);
                  } else {
                    history.push(`/websystem/dashboard-properties`);
                  }
                } catch (error) {
                  throw error;
                }
              }}
            />
            <CustomModalMessage
              isModalVisible={isOpenComponent === 6}
              title="Aplicar a la propiedad"
              subTitle="¿Estás seguro que deseas aplicar a esta propiedad?"
              mainText="Notificaremos al propietario sobre tu postulación, recibirás mayor información a través de tu correo electrónico una vez que tu propietario evalúe tu petición."
              icon={<IconProperty width="200px" />}
              labelLeft="Aceptar"
              labelRight="Cancelar"
              onClose={() => {
                setIsOpenComponent(null);
              }}
              onClickRight={() => {
                setIsOpenComponent(null);
              }}
              onClickLeft={async () => {
                try {
                  await handlerCallApplyToProperty(
                    {
                      idApartment: dataDetail.idApartment,
                      identifier: dataDetail.identifier,
                    },
                    dataDetail.idProperty
                  );
                } catch (error) {
                  throw error;
                }
              }}
            />
            <CustomValidationUser
              isVisible={isOpenComponent == 4}
              onClose={() => {
                setIsOpenComponent(null);
              }}
              finished={() => {
                setIsOpenComponent(null);
              }}
              metadata={{
                idCustomer: dataProfile.idCustomer,
              }}
              clientId={dataProfile.clientId}
              flowId={dataProfile.flowId}
              finishedProcess={() => {
                setIsOpenComponent(null);
                handlerCallAsyncApis();
              }}
            />
            <SectionAssociationProperty history={history} />
            <SectionAssociationApplicant history={history} />
            <div className="top-timeline-mobile" id="process-timeline-top">
              <SectionTimeLine
                history={history}
                onOpenComponent={(id) => {
                  setIsOpenComponent(id);
                }}
                isOpenComponent={isOpenComponent}
                dataTimeLine={dataTimeLine}
              />
            </div>
            <ContentForm owner>
              <div className="back-button">
                <button
                  onClick={() => {
                    if (
                      isNil(dataUserRedirect) === false &&
                      isEmpty(dataUserRedirect.backPathDirect) === false &&
                      isNil(dataUserRedirect.backPathDirect) === false
                    ) {
                      history.push(dataUserRedirect.backPathDirect);
                    } else {
                      history.push(`/websystem/dashboard-properties`);
                    }
                  }}
                >
                  <Arrow width="25px" />
                </button>
              </div>
              <div className="header-title">
                <h1>Detalle de inmueble</h1>
                <div className="shared-by-info">
                  {isNil(dataDetail.sharedBy) === false && (
                    <SharedByUser>
                      Ficha compartida por {dataDetail.sharedBy}
                    </SharedByUser>
                  )}
                </div>
                <div
                  className="buttons-actions"
                  style={{
                    display: "flex",
                  }}
                  id="buttons-action-detail"
                >
                  {dataDetail.isPublished === true && (
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item>
                            <span
                              onClick={() => {
                                navigator.share({
                                  title: dataDetail.title,
                                  text: dataDetail.description,
                                  url: `${frontFunctions.parseUrlHomify(
                                    dataDetail.shortAddress,
                                    dataDetail.identifier
                                  )}`,
                                });
                              }}
                            >
                              Compartir
                            </span>
                          </Menu.Item>
                          <Menu.Item>
                            <a
                              target="_blank"
                              href={`https://wa.me/?text=Te+invito+a+que+veas+esta+propiedad%0a${frontFunctions.parseUrlHomify(
                                dataDetail.shortAddress,
                                dataDetail.identifier
                              )}`}
                            >
                              WhatsApp
                            </a>
                          </Menu.Item>
                          <Menu.Item>
                            <span
                              onClick={() => {
                                copyTextToClipboard(
                                  `${frontFunctions.parseUrlHomify(
                                    dataDetail.shortAddress,
                                    dataDetail.identifier
                                  )}`
                                );
                              }}
                            >
                              Copiar link
                            </span>
                          </Menu.Item>
                          {/* <Menu.Item>
                      <a
                        target="_blank"
                        href={`http://m.me/?text=Te+invito+a+que+veas+esta+propiedad%0a${window.location.origin}/property/${dataDetail.identifier}`}
                      >
                        Facebook
                      </a>
                    </Menu.Item> */}
                        </Menu>
                      }
                      placement="bottomLeft"
                      arrow
                    >
                      <ButtonIcon onClick={() => {}}>
                        <IconShare
                          color="var(--color-primary)"
                          backGround="var(--color-primary)"
                        />
                      </ButtonIcon>
                    </Dropdown>
                  )}
                  {dataDetail.canBeFavorite === true && (
                    <ButtonIcon
                      onClick={async () => {
                        try {
                          await handlerCallSetFavoriteProperty(
                            {
                              idApartment: dataDetail.idApartment,
                              identifier: dataDetail.identifier,
                            },
                            dataDetail.idProperty
                          );
                          handlerCallAsyncApis();
                        } catch (error) {}
                      }}
                    >
                      <IconHeart
                        backGround={
                          dataDetail.isFavorite === true
                            ? "var(--color-primary)"
                            : "transparent"
                        }
                        color="var(--color-primary)"
                      />
                    </ButtonIcon>
                  )}
                  {dataDetail.isOwner === true && (
                    <ButtonIcon
                      onClick={() => {
                        setIsVisibleDelete(true);
                      }}
                    >
                      <IconDelete
                        backGround="transparent"
                        color="var(--color-primary)"
                      />
                    </ButtonIcon>
                  )}
                  {dataDetail.canBeEdited === true && (
                    <ButtonIcon
                      onClick={async () => {
                        history.push(`/websystem/edit-property/${idProperty}`);
                      }}
                    >
                      <IconEditSquare
                        backGround="transparent"
                        color="var(--color-primary)"
                      />
                    </ButtonIcon>
                  )}
                </div>
              </div>
              <div>
                <SectionCarouselInfo
                  apartmentImages={
                    isNil(dataDetailImages) === false &&
                    isEmpty(dataDetailImages) === false
                      ? dataDetailImages
                      : []
                  }
                  idUserType={dataProfile.idUserType}
                />
                <ContainerDown>
                  <TabsProperty>
                    {dataTabsProperty.map((row) => {
                      return (
                        <Tab
                          selected={tabSelect === row.id}
                          onClick={() => {
                            setTabSelect(row.id);
                          }}
                        >
                          <h1>{row.text}</h1>
                          <hr />
                        </Tab>
                      );
                    })}
                  </TabsProperty>
                  {tabSelect === "1" && <SectionFeatures />}
                  {tabSelect === "2" && <SectionLocation />}
                  {tabSelect === "3" && <SectionAmenities />}
                  {dataDetail.isOwner === true && (
                    <SeparateServices>
                      <div
                        className="services-header"
                        id="requirement-property"
                      >
                        <h1>Requisitos de la Propiedad</h1>
                        <p>
                          Establece los requisitos de tu propiedad, puedes
                          solicitar que tus prospectos apliquen para una de
                          nuestras Pólizas Jurídicas o bien, puedes establecer
                          cualquiera de los procesos disponibles para ti.
                        </p>
                      </div>
                      <SectionPolicy
                        onClickViewPolicy={() => {
                          history.push(
                            `/websystem/select-policy/${idProperty}`
                          );
                        }}
                        idUserType={dataProfile.idUserType}
                      />
                      <SectionServiceAgent
                        dataApplication={dataApplicationMethod}
                        onClickViewPolicy={() => {
                          history.push(
                            `/websystem/select-policy/${idProperty}`
                          );
                        }}
                      />
                    </SeparateServices>
                  )}
                  {dataProfile.idUserType !== 2 && <SectionPublicProperty />}
                </ContainerDown>
              </div>
            </ContentForm>

            <ContentRight>
              <div
                className="right-timeline-mobile"
                id="process-timeline-right"
              >
                <SectionTimeLine
                  history={history}
                  onOpenComponent={(id) => {
                    setIsOpenComponent(id);
                  }}
                  isOpenComponent={isOpenComponent}
                  dataTimeLine={dataTimeLine}
                />
              </div>
              <SectionDocuments
                onReportClose={() => {
                  setIsOpenComponent(null);
                }}
              />
              <SectionPropertyDocuments
                getDocumentProperty={() => {
                  handlerCallGetDocRequiredByProperty({
                    idProperty: dataDetail.idProperty,
                    idApartment: dataDetail.idApartment,
                  });
                }}
              />
              {dataProfile.idUserType !== 2 && (
                <>
                  {((isNil(dataDetail.sharedBy) === false &&
                    isEmpty(dataDetail.sharedBy) === false) ||
                    dataDetail.isOwner === true) && <SectionApplicants />}
                  {dataDetail.isOwner === true && (
                    <SectionAgents idUserType={dataProfile.idUserType} />
                  )}
                </>
              )}
              {isNil(dataDetail.ownerEmailAddress) === false &&
                dataProfile.idUserType === 4 && (
                  <GeneralCard>
                    <div className="header-title">
                      <h1>Propietario</h1>
                    </div>
                    <div className="content-card">
                      <Card>
                        <div className="card-user">
                          <div className="top-info">
                            <div className="icon-info">
                              <IconOwner size="100%" color="#4E4B66" />
                            </div>
                            <div className="name-info">
                              <h3>
                                {dataDetail.ownerGivenName}{" "}
                                {dataDetail.ownerLastName}
                              </h3>
                              <span>{dataDetail.ownerEmailAddress}</span>
                              <span>{dataDetail.ownerPhoneNumber}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </GeneralCard>
                )}
            </ContentRight>
          </ContextProperty.Provider>
        </Content>
      )}
      {isEmpty(dataDetail) === true && (
        <EmptyData>
          <img
            width="150"
            src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296S.png"
            alt=""
          />
          <p>Oops!, parece que este inmueble ya no está disponible :(</p>
        </EmptyData>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu, dataUserRedirect } = state;
  return {
    dataProfile: dataProfile.dataProfile,
    dataUserRedirect: dataUserRedirect.dataUserRedirect,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPropertyUsers);
