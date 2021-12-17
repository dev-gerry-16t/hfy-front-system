import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
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
  const { match, callGlobalActionApi, dataProfile, history } = props;
  const { params } = match;
  const [idProperty, setIdProperty] = useState(params.idProperty);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [isOpenComponent, setIsOpenComponent] = useState(null);
  const [dataDetail, setDataDetail] = useState({});
  const [dataApplicationMethod, setDataApplicationMethod] = useState([]);
  const [tabSelect, setTabSelect] = useState("1");
  const frontFunctions = new FrontFunctions();

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
      setDataDetail(responseResult);
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
        API_CONSTANTS.CUSTOMER.UPDATE_PROPERTY,
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
        };
      });
    }
    return arrayDocuments;
  };

  useEffect(() => {
    setIdProperty(params.idProperty);
  }, [params.idProperty]);

  useEffect(() => {
    handlerCallGetPropertyById();
    handlerCallGetAllApplicationMethods();
  }, [idProperty]);

  return (
    <Content>
      <ContextProperty.Provider
        value={{
          isOpenComponent,
          dataDetail,
          updateProperty: async (data) => {
            try {
              await handlerCallUpdateProperty(data);
            } catch (error) {
              throw error;
            }
          },
          getById: () => {
            handlerCallGetPropertyById();
          },
        }}
      >
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
              history.push(`/websystem/dashboard-properties`);
            } catch (error) {
              throw error;
            }
          }}
        />
        <SectionAssociationProperty history={history} />
        <SectionAssociationApplicant history={history} />
        <ContentForm owner>
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
              style={{
                display: "flex",
              }}
            >
              {dataDetail.isPublished === true && (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <a
                          target="_blank"
                          href={`https://wa.me/?text=Te+invito+a+que+veas+esta+propiedad%0a${window.location.origin}/property/${dataDetail.identifier}`}
                        >
                          WhatsApp
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <span
                          onClick={() => {
                            copyTextToClipboard(
                              `${window.location.origin}/property/${dataDetail.identifier}`
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
                      handlerCallGetPropertyById();
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
                isNil(dataDetail) === false &&
                isNil(dataDetail.apartmentDocuments) === false
                  ? JSON.parse(dataDetail.apartmentDocuments)
                  : []
              }
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
                  <div className="services-header">
                    <h1>Requisitos de la Propiedad</h1>
                    <p>
                      Establece los requisitos de tu propiedad, puedes solicitar
                      que tus prospectos apliquen para una de nuestras Pólizas
                      Juríducas o bien, puedes establecer cualquiera de los
                      procesos disponibles para ti.
                    </p>
                  </div>
                  <SectionPolicy
                    onClickViewPolicy={() => {
                      history.push(`/websystem/select-policy/${idProperty}`);
                    }}
                    idUserType={dataProfile.idUserType}
                  />
                  <SectionServiceAgent
                    dataApplication={dataApplicationMethod}
                  />
                </SeparateServices>
              )}
              {dataProfile.idUserType !== 2 && <SectionPublicProperty />}
            </ContainerDown>
          </div>
        </ContentForm>

        <ContentRight>
          <SectionTimeLine
            history={history}
            onOpenComponent={(id) => {
              setIsOpenComponent(id);
            }}
          />
          <SectionDocuments
            onReportClose={() => {
              setIsOpenComponent(null);
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
                          <IconTenant size="100%" color="#4E4B66" />
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
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
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
