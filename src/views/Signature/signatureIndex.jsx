import React, { useState, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { Modal } from "antd";
import SignatureCanvas from "react-signature-canvas";

const SgnatureIndex = () => {
  const [signature, setSignature] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const signatureRef = useRef(null);

  let stringSignature = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
	<TITLE></TITLE>
	<META NAME="GENERATOR" CONTENT="LibreOffice 4.1.6.2 (Linux)">
	<META NAME="AUTHOR" CONTENT="Office 365">
	<META NAME="CREATED" CONTENT="20201217;63500000000000">
	<META NAME="CHANGEDBY" CONTENT="Cuenta Microsoft">
	<META NAME="CHANGED" CONTENT="20201223;25000000000000">
	<META NAME="AppVersion" CONTENT="15.0000">
	<META NAME="DocSecurity" CONTENT="0">
	<META NAME="HyperlinksChanged" CONTENT="false">
	<META NAME="LinksUpToDate" CONTENT="false">
	<META NAME="ScaleCrop" CONTENT="false">
	<META NAME="ShareDoc" CONTENT="false">
	<STYLE TYPE="text/css">
	<!--
		@page { size: 8.5in 11in; margin-left: 1.18in; margin-right: 1.18in; margin-top: 0.49in; margin-bottom: 0.49in }
		P { margin-bottom: 0.08in; direction: ltr; widows: 2; orphans: 2 }
	-->
	</STYLE>
</HEAD>
<BODY LANG="es-MX" DIR="LTR">
<DIV TYPE=HEADER>
	<P STYLE="margin-bottom: 0.45in"><BR>
	</P>
</DIV>
<P ALIGN=RIGHT STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">FOLIO:
</FONT><FONT COLOR="#ff0000"><FONT FACE="Arial, serif">HOM0060</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>CONTRATO
DE ARRENDAMIENTO DE CASA HABITACIÓN QUE CELEBRAN POR UNA PARTE LA
SEÑORA ARACELI HURTADO FEREGRINO, EN LO SUCESIVO, SE LE DENOMINARÁ
COMO “EL ARRENDADOR”, Y POR LA OTRA PARTE EL SEÑOR MANUEL
FEDERICO SABORIT GARCÍA PEÑA, EN LO SUCESIVO “EL
ARRENDATARIO”.</B></FONT><FONT FACE="Arial, serif"><B>QUIENES SE
SUJETAN AL TENOR DE LAS SIGUIENTES DECLARACIONES Y CLAUSULAS</B></FONT><FONT FACE="Arial, serif"><B>:
</B></FONT>
</P>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>D
E C L A R A C I O N E S</B></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><BR><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>1.</B></FONT><FONT FACE="Arial, serif">
Declara </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">: </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>1.1</B></FONT><FONT FACE="Arial, serif">
Ser una persona física, de nacionalidad </FONT><FONT FACE="Arial, serif"><B>mexicana</B></FONT><FONT FACE="Arial, serif">,
cuenta con identificación oficial</FONT><FONT FACE="Arial, serif"><B>
</B></FONT><FONT FACE="Arial, serif">expedida por el Instituto
Nacional Electoral con clave de elector </FONT><FONT FACE="Arial, serif"><B>HRFRAR62051609M200</B></FONT><FONT FACE="Arial, serif">,
con Clave Única de Registro de Población </FONT><FONT FACE="Arial, serif"><B>HUFA620516MDFRRR05</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif">
así como con la capacidad legal y económica suficiente para
celebrar el presente contrato. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0in; background: #ffffff"><FONT FACE="Arial, serif"><B>1.2</B></FONT><FONT FACE="Arial, serif">
Se encuentra inscrito en el Registro Federal de Contribuyentes
</FONT><FONT FACE="Arial, serif"><B>HUFA620516LN4 </B></FONT><FONT FACE="Arial, serif">y
su domicilio está ubicado en Vasco de Quiroga número 4309,
Interior 2002, Colonia Santa Fe, Alcaldía Cuajimalpa, Código Postal
05348, Ciudad de México. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0in; background: #ffffff"> 
</P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0in; background: #ffffff"><FONT FACE="Arial, serif"><B>1.3</B></FONT><FONT FACE="Arial, serif">
Que es el único y legítimo propietario del inmueble ubicado en
</FONT><FONT FACE="Arial, serif"><B>Vasco de Quiroga número 4309</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Interior 2002</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Colonia Santa Fe</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Alcaldía Cuajimalpa</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Código Postal 05348</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Ciudad de México</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>1.4</B></FONT><FONT FACE="Arial, serif">
Para el efecto del presente contrato, el inmueble descrito en el
párrafo que antecede será en lo sucesivo reconocido como </FONT><FONT FACE="Arial, serif"><B>“EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif">, el cual
se encuentra </FONT><FONT FACE="Arial, serif"><B>amueblado </B></FONT><FONT FACE="Arial, serif">y
se entrega un inventario </FONT><FONT FACE="Arial, serif">que se
anexa al presente instrumento como </FONT><FONT FACE="Arial, serif"><B>ANEXO
1</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
INMUEBLE ARRENDADO” </B></FONT><FONT FACE="Arial, serif">cuenta con
dos cajones de estacionamiento para goce del </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>1.5
</B></FONT><FONT FACE="Arial, serif">Que </FONT><FONT FACE="Arial, serif"><B>“EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif"> se
encuentra libre de gravámenes, afectaciones y limitaciones de
dominio de cualquier tipo, está al corriente en el pago de todas
las contribuciones que le son aplicables y libre de cualquier
ocupación, permiso, autorización o concesión otorgada a favor
de terceros, así como compromiso de venta o de renta previo a la
firma del presente contrato. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Asimismo,
</FONT><FONT FACE="Arial, serif"><B>“EL INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif">
se encuentra libre de cualquier adeudo de pago de predial, energía
eléctrica, consumo de agua y de cualquier servicio público, así
como de compromiso y obligación laboral o de cualquier otro tipo
que pudiera afectar, restringir o excluir su uso, goce o posesión. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>1.6</B></FONT><FONT FACE="Arial, serif">
&nbsp;Que es su deseo otorgar en arrendamiento “</FONT><FONT FACE="Arial, serif"><B>EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif"> a </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">, para fines
exclusivamente residenciales, sin existir ningún impedimento para
ello, de acuerdo con los términos y condiciones establecidos en  el
presente acuerdo de voluntades.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>2.</B></FONT><FONT FACE="Arial, serif">
Declara </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> por su propio
derecho: </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>2.1</B></FONT><FONT FACE="Arial, serif">
Ser una persona física, de nacionalidad </FONT><FONT FACE="Arial, serif"><B>mexicana</B></FONT><FONT FACE="Arial, serif">,
cuenta con Pasaporte</FONT><FONT FACE="Arial, serif"><B> </B></FONT><FONT FACE="Arial, serif">expedido
por la Secretaria de Relaciones Exteriores número </FONT><FONT FACE="Arial, serif"><B>G14072865</B></FONT><FONT FACE="Arial, serif">,
con Registro Federal de Contribuyentes </FONT><FONT FACE="Arial, serif"><B>SAGM600905HV8</B></FONT><FONT FACE="Arial, serif">,
Clave Única de Registro Poblacional </FONT><FONT FACE="Arial, serif"><B>SAGM600905HCLBRN02</B></FONT><FONT FACE="Arial, serif">
</FONT><FONT FACE="Arial, serif"> así como con la capacidad legal y
económica suficiente para celebrar el presente contrato. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>2.2</B></FONT><FONT FACE="Arial, serif">
&nbsp;Que es su deseo recibir en arrendamiento “</FONT><FONT FACE="Arial, serif"><B>EL
INMUEBLE ARRENDADO</B></FONT><FONT FACE="Arial, serif">”, para
destinarlo a fines exclusivamente residenciales, de acuerdo con los
términos y condiciones establecidos en el presente documento. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>2.3</B></FONT><FONT FACE="Arial, serif">
&nbsp;Que el recurso con el que hará frente a la obligación de
pago, es producto del desarrollo de su actividad y/u oficio
profesional preponderante, el cual es una actividad totalmente
lícita. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>2.4
</B></FONT><FONT FACE="Arial, serif">Declara bajo protesta de decir
verdad, que no ha incurrido en la comisión de delito alguno,
incluyendo los que establece la Ley Nacional de Extinción de
Dominio.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>2.5</B></FONT><FONT FACE="Arial, serif">
Se identifica con Pasaporte</FONT><FONT FACE="Arial, serif"><B>
</B></FONT><FONT FACE="Arial, serif">expedido por la Secretaria de
Relaciones Exteriores con número </FONT><FONT FACE="Arial, serif"><B>G14072865</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0in"><FONT FACE="Arial, serif"><B>2.6</B></FONT><FONT FACE="Arial, serif">
&nbsp;Que para el cumplimiento de sus obligaciones deja como garantía
el pago de </FONT><FONT FACE="Arial, serif"><B>1 mes de renta</B></FONT><FONT FACE="Arial, serif">
equivalente a la cantidad de </FONT><FONT FACE="Arial, serif"><B>$
23,000.00 (Veintitrés mil pesos 00/100 M.N.)</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>3.
DECLARAN LAS PARTES: </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>3.1</B></FONT><FONT FACE="Arial, serif">
Se reconocen mutuamente sin reserva ni limitación alguna la
personalidad con la cual comparecen a la celebración del presente
contrato, están enterados de las consecuencias legales de
manifestar datos falsos, así como del uso de documentación
apócrifa, por lo que estan de acuerdo en sujetarse a las siguientes:
</FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><BR><BR>
</P>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>C
L Á U S U L A S</B></FONT></P>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><BR><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>PRIMERA.-
 OBJETO DEL CONTRATO. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">En
este acto, </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> otorga en
arrendamiento a </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif"> descrito
en la declaración </FONT><FONT FACE="Arial, serif"><B>1.3</B></FONT><FONT FACE="Arial, serif">
del presente contrato, dándo </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> por recibido </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif"> a su
entera satisfacción, en las condiciones previamente conocidas y
verficadas a la firma del presente acuerdo de voluntades.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>SEGUNDA.
- USO DEL INMUEBLE ARRENDADO. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> se obliga a
utilizar </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif"> materia
del presente contrato para fines exclusivamente residenciales
(departamento), por lo que no podrá destinarla a ningún otro uso,
sin el consentimiento expreso y por escrito de </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> declara </FONT><FONT FACE="Arial, serif"><B>BAJO
PROTESTA DE DECIR VERDAD</B></FONT><FONT FACE="Arial, serif">, desde
este momento y para todos los efectos legales a que haya lugar, que
destinará el inmueble únicamente para el uso aquí mencionado,
lo que hace del conocimiento de </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">, deslindándolo
desde este momento de cualquier responsabilidad civil, mercantil o
penal, por un uso distinto al </FONT><FONT FACE="Arial, serif"><B>HABITACIONAL</B></FONT><FONT FACE="Arial, serif">.
Estableciendo desde ahora que </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> presume como
cierta la manifestación de uso y destino lícito del inmueble que
realizará </FONT><FONT FACE="Arial, serif"><B>“EL ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Cualquier
actividad directa o indirecta que se realice en el inmueble arrendado
ya sea por la comisión de algún delito, incluyendo aquellos que
prevé la Ley Nacional de Extinción de Dominio, será
responsabilidad exclusivamente de </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">, de sus
familiares, empleados o cualquier persona que directa o
indirectamente ocupe o llegue a ingresar al inmueble; el
</FONT><FONT FACE="Arial, serif"><B>“ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">
estará obligado a hacerla del conocimiento de la autoridad
competente en la que externe expresamente que el inmueble se
encuentra arrendado de </FONT><FONT FACE="Arial, serif"><B>“BUENA
FE”</B></FONT><FONT FACE="Arial, serif"> y que los actos en que
haya participado el inmueble de ninguna manera tuvo conocimiento o
participación </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>El
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> bajo protesta de
decir verdad manifiesta que, durante la vigencia de este contrato,
sus prórrogas o tácita reconducción y mientras se encuentre en
posesión del inmueble, tomará todas las medidas para evitar que
cualquier persona a la que permita el ingreso al Inmueble, realice
cualquier clase de hechos ilícitos que involucren al inmueble,
particularmente aquellos previstos y sancionados en la Ley Nacional
de Extinción de Dominio, liberando a </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> de toda
responsabilidad en la que pudiera verse involucrado.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>TERCERA.-
DE LA “RENTA MENSUAL” Y “DEPÓSITO EN GARANTÍA”. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>3.1
</B></FONT><FONT FACE="Arial, serif"> </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> pagará a </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> por concepto de
renta mensual la cantidad de </FONT><FONT FACE="Arial, serif"><B>$23,000.00
(Veintitrés mil pesos 00/100 M.N.) </B></FONT><FONT FACE="Arial, serif">cantidad
que en lo sucesivo se  denominará la </FONT><FONT FACE="Arial, serif"><B>“RENTA
MENSUAL”</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO” </B></FONT><FONT FACE="Arial, serif">pagará a </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> </FONT><FONT FACE="Arial, serif">o
quien sus derechos legalmente represente, la cantidad de </FONT><FONT FACE="Arial, serif"><B>$276,000.00
(Doscientos setenta y seis mil pesos 00/100 M.N.)</B></FONT><FONT FACE="Arial, serif">
por concepto de renta por </FONT><FONT FACE="Arial, serif"><B>12
(DOCE)</B></FONT><FONT FACE="Arial, serif"> meses, del inmueble
materia del presente contrato, la cual será́ pagada en </FONT><FONT FACE="Arial, serif"><B>8
(ocho)</B></FONT><FONT FACE="Arial, serif"> exhibiciones mensuales,
serán pagadas de la siguiente manera;</FONT></P>
<OL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">En fecha </FONT><FONT FACE="Arial, serif"><U><B>28
	de diciembre de 2020</B></U></FONT><FONT FACE="Arial, serif"> por la
	cantidad de </FONT><FONT FACE="Arial, serif"><B>$46,000.00</B></FONT><FONT FACE="Arial, serif">
	</FONT><FONT FACE="Arial, serif"><B>(Cuarenta y seis mil pesos
	00/100 M.N.)</B></FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL START=2>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">En fecha </FONT><FONT FACE="Arial, serif"><U><B>28
	de enero de 2021</B></U></FONT><FONT FACE="Arial, serif"> por la
	cantidad de </FONT><FONT FACE="Arial, serif"><B>$92,000.00</B></FONT><FONT FACE="Arial, serif">
	</FONT><FONT FACE="Arial, serif"><B>(Noventa y dos mil pesos 00/100
	M.N.)</B></FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL START=3>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">En fecha </FONT><FONT FACE="Arial, serif"><U><B>15
	de febrero de 2021</B></U></FONT><FONT FACE="Arial, serif"> por la
	cantidad de </FONT><FONT FACE="Arial, serif"><B>$23,000.00</B></FONT><FONT FACE="Arial, serif">
	</FONT><FONT FACE="Arial, serif"><B>(Veintitrés mil pesos 00/100
	M.N.)</B></FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL START=4>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">En fecha </FONT><FONT FACE="Arial, serif"><U><B>15
	de marzo de 2021</B></U></FONT><FONT FACE="Arial, serif"> por la
	cantidad de </FONT><FONT FACE="Arial, serif"><B>$23,000.00</B></FONT><FONT FACE="Arial, serif">
	</FONT><FONT FACE="Arial, serif"><B>(Veintitrés mil pesos 00/100
	M.N.)</B></FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL START=5>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">En fecha </FONT><FONT FACE="Arial, serif"><U><B>15
	de abril de 2021</B></U></FONT><FONT FACE="Arial, serif"> por la
	cantidad de </FONT><FONT FACE="Arial, serif"><B>$23,000.00</B></FONT><FONT FACE="Arial, serif">
	</FONT><FONT FACE="Arial, serif"><B>(Veintitrés mil pesos 00/100
	M.N.)</B></FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL START=6>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">En fecha </FONT><FONT FACE="Arial, serif"><U><B>15
	de mayo de 2021</B></U></FONT><FONT FACE="Arial, serif"> por la
	cantidad de </FONT><FONT FACE="Arial, serif"><B>$23,000.00</B></FONT><FONT FACE="Arial, serif">
	</FONT><FONT FACE="Arial, serif"><B>(Veintitrés mil pesos 00/100
	M.N.)</B></FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL START=7>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">En fecha </FONT><FONT FACE="Arial, serif"><U><B>15
	de junio de 2021</B></U></FONT><FONT FACE="Arial, serif"> por la
	cantidad de </FONT><FONT FACE="Arial, serif"><B>$23,000.00</B></FONT><FONT FACE="Arial, serif">
	</FONT><FONT FACE="Arial, serif"><B>(Veintitrés mil pesos 00/100
	M.N.)</B></FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL START=8>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">En fecha </FONT><FONT FACE="Arial, serif"><U><B>15
	de julio de 2021</B></U></FONT><FONT FACE="Arial, serif"> por la
	cantidad de </FONT><FONT FACE="Arial, serif"><B>$23,000.00</B></FONT><FONT FACE="Arial, serif">
	</FONT><FONT FACE="Arial, serif"><B>(Veintitrés mil pesos 00/100
	M.N.)</B></FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Dicho
pago se deberá realizar en efectivo y</FONT><FONT FACE="Arial, serif"><B>
</B></FONT><FONT FACE="Arial, serif"> </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDADOR</B></FONT><FONT FACE="Arial, serif"><B>” </B></FONT><FONT FACE="Arial, serif">se</FONT><FONT FACE="Arial, serif">
obliga a hacer la devolución del </FONT><FONT FACE="Arial, serif"><B>PAGARÉ</B></FONT><FONT FACE="Arial, serif">
correspondiente al mes en curso si éste ya está pagado</FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> pagará a </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> en caso de existir
mora en el pago de la renta por concepto de intereses el </FONT><FONT FACE="Arial, serif"><B>1</B></FONT><FONT FACE="Arial, serif"><B>5%
(Quince por ciento)</B></FONT><FONT FACE="Arial, serif"> de la
parcialidad mensual por cada mes de retraso a partir de la fecha de
pago. La renta se causara por meses completos, aun cuando el inmueble
sea ocupado por lapsos inferiores a un mes, consecuentemente
cualquiera que sea la fecha en el que </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> desocupe el
inmueble, la renta deberá pagarse por la parcialidad mensual del
periodo que corresponde. Las partes convienen en que el importe de la
renta deberá cubrirse siempre dentro de plazo y en el domicilio o
cuenta bancaria convenida, y no podrá retenerse por ningún concepto
o determinación, ya sea judicial o extra judicial.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>3.2
“DEPÓSITO EN GARANTÍA”</B></FONT></P>
<OL TYPE=a>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	“<FONT FACE="Arial, serif"><B>EL ARRENDATARIO” </B></FONT><FONT FACE="Arial, serif">hace
	entrega a </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
	ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> por concepto de
	</FONT><FONT FACE="Arial, serif"><B>“DEPÓSITO EN GARANTÍA”</B></FONT><FONT FACE="Arial, serif">
	la cantidad de </FONT><FONT FACE="Arial, serif"><B>$23,000.00
	(veintitrés mil pesos 00/100 M.N.)</B></FONT><FONT FACE="Arial, serif">
	correspondientes a </FONT><FONT FACE="Arial, serif">un</FONT><FONT FACE="Arial, serif">
	mes de </FONT><FONT FACE="Arial, serif"><B>renta mensual </B></FONT><FONT FACE="Arial, serif">que
	tendrá verificativo el día de la</FONT><FONT FACE="Arial, serif"><B>
	firma del presente contrato</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=2>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">El </FONT><FONT FACE="Arial, serif"><B>“DEPÓSITO
	EN GARANTÍA”</B></FONT><FONT FACE="Arial, serif"> será́
	devuelto a</FONT><FONT FACE="Arial, serif"> </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO” 30 DÍAS</B></FONT><FONT FACE="Arial, serif">
	naturales</FONT><FONT FACE="Arial, serif"> </FONT><FONT FACE="Arial, serif">posteriores
	a la entrega del inmueble, siempre que esté no presentare daño
	alguno, esté completo el inventario y no existan adeudos por
	servicios instalados a la fecha. En caso contrario, dicha suma la
	aplicará “</FONT><FONT FACE="Arial, serif"><B>EL ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">
	para hacer el pago de dichos adeudos así́ como de las obras de
	reparación que fueren necesarias o la compra de objetos faltantes
	en el inventario, en la inteligencia de que </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> tendrá́
	derecho de que se le exhiban los comprobantes de pago de que se
	trate, según proceda, a la devolución del remanente que debe a su
	favor. </FONT>
	</P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=3>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	“<FONT FACE="Arial, serif"><B>EL ARRENDADOR” </B></FONT><FONT FACE="Arial, serif">para
	hacer el  pago de dichos adeudos así como de las obras de
	reparación que fuere necesarias o la compra de objetos faltantes en
	el inventario, en la inteligencia de que </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO” </B></FONT><FONT FACE="Arial, serif">tendrá derecho
	de que se le exhiban los comprobantes de pago de que se trate, según
	proceda, a la devolución del remanente que deba a su favor.</FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=4>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Acuerdan las partes que el </FONT><FONT FACE="Arial, serif"><B>depósito
	dado en garantía en ningún caso se aplicará a cuenta de rentas
	vencidas o por pagar.</B></FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=5>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Una vez que </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> entregué el
	último recibo totalmente liquidado del servicio de energía
	eléctrica o cualquier otro servicio, </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> tendrá derecho
	a la devolución sin intereses del depósito dado en garantía o su
	remanente en caso de que parte del mismo hubiese sido utilizado para
	liquidar cuentas pendientes del propio Arrendatario.</FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=6>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Conviniendo ambas partes que esta
	devolución se efectuará  inmediatamente después de haber recibido
	</FONT><FONT FACE="Arial, serif"><B>a entera conformidad el
	INMUEBLE</B></FONT><FONT FACE="Arial, serif">, así como los recibos
	antes mencionados.</FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=7>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif"><U><B>En caso de terminación anticipada o
	rescisión del presente contrato, por solicitud del arrendatario
	antes del vencimiento del citado contrato se penalizará con el
	depósito dado en garantía, independientemente de los gastos que se
	hayan generado durante la vigencia del arrendamiento.</B></U></FONT></P>
</OL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0in"><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><BR><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>CUARTA.-
VIGENCIA </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">El
presente contrato estará vigente por un plazo de </FONT><FONT FACE="Arial, serif"><B>12
</B></FONT><FONT FACE="Arial, serif">(doce) meses contado a partir
del día </FONT><FONT FACE="Arial, serif"><U><B>28 de diciembre de
2020</B></U></FONT><FONT FACE="Arial, serif"> y concluirá el día </FONT><FONT FACE="Arial, serif"><U><B>31
de diciembre de 2021</B></U></FONT><FONT FACE="Arial, serif">. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> solicitará por
escrito y con un mínimo de </FONT><FONT FACE="Arial, serif"><B>59</B></FONT><FONT FACE="Arial, serif">
días </FONT><FONT FACE="Arial, serif"><B>naturales</B></FONT><FONT FACE="Arial, serif">
anteriores al vencimiento del término de este contrato, su
intención de renovar el arrendamiento para otro periodo anual, y de
ser aceptada dicha solicitud de renovación por </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">, desde hoy queda
entendido que el nuevo acuerdo de voluntades además de contener las
mismas características del presente contrato, podrá estipular
condiciones adicionales y pudiera establecer el incremento al precio
de la renta mensual tomando como base el Índice Nacional de Precios
al Consumidor anualizado, que publica el Instituto Nacional de
Geografía y Estadística y/o Banco de México.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Estando
de acuerdo las partes en que </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> tendrá el
derecho preferencial para la suscripción del nuevo contrato de
arrendamiento con vigencia de un año cubriendo las diferencias de
costo que esto represente siempre y cuando este contrato siga en
vigencia.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">En
caso de que </FONT><FONT FACE="Arial, serif"><B>“EL ARRENDATARIO”
</B></FONT><FONT FACE="Arial, serif">no solicite</FONT><FONT FACE="Arial, serif"><B>
</B></FONT><FONT FACE="Arial, serif">por escrito y con un mínimo de
</FONT><FONT FACE="Arial, serif"><B>59</B></FONT><FONT FACE="Arial, serif">
días </FONT><FONT FACE="Arial, serif"><B>naturales</B></FONT><FONT FACE="Arial, serif">
anteriores al vencimiento del término de este contrato su
intención de renovar el arrendamiento para otro periodo anual, </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> podrá dar por
</FONT><FONT FACE="Arial, serif"><B>HECHO</B></FONT><FONT FACE="Arial, serif">
que es libre de empezár a publicar, la renta o venta del inmueble
después del día </FONT><FONT FACE="Arial, serif"><B>59, “EL
ARRENDADOR” </B></FONT><FONT FACE="Arial, serif">contará con </FONT><FONT FACE="Arial, serif"><B>10
(DIEZ)</B></FONT><FONT FACE="Arial, serif"> días naturales para
responder a </FONT><FONT FACE="Arial, serif"><B>“EL ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">
una vez que “</FONT><FONT FACE="Arial, serif"><B>EL ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">
haya solicitado por escrito la intención de renovar el contrato para
otro periodo anual.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">En
caso que ambas partes no lleguen a un acuerdo antes de los 59 días
naturales al vencimiento de este contrato, respecto a la renovación
del contrato de arrendamiento o que</FONT><FONT FACE="Arial, serif"><B>
“EL ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> sea omiso
en solicitar oportunamente la renovación del contrato, </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> deberá
entregar el inmueble arrendado a más tardar el último día de
vigencia del presente contrato, renunciando a los Derechos de
preferencia establecidos en el Código Civil para la Ciudad México,
para el caso de que</FONT><FONT FACE="Arial, serif"><FONT SIZE=2 STYLE="font-size: 11pt">
</FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=2 STYLE="font-size: 11pt"><B>“EL
ARRENDADOR”</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=2 STYLE="font-size: 11pt">
</FONT></FONT><FONT FACE="Arial, serif">deseé volver a arrendar o
vender el Inmueble a un tercero</FONT><FONT FACE="Arial, serif"><FONT SIZE=2 STYLE="font-size: 11pt">,
</FONT></FONT><FONT FACE="Arial, serif">así como acreditar a </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">, haber liquidado
completamente y sin adeudos, los pagos a los que está obligado a
cubrir por concepto de rentas y de demás servicios que estén
instalados en el inmueble y por tanto, son intrínsecos al
arrendamiento. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>QUINTA.-
PENA CONVENCIONAL</B></FONT><FONT FACE="Arial, serif"><FONT SIZE=2 STYLE="font-size: 11pt">.</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
<FONT FACE="Arial, serif">En el evento de que</FONT><FONT FACE="Arial, serif">
</FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> </FONT><FONT FACE="Arial, serif">incumpla
a cualquiera de las cláusulas de este contrato las cuales den
motivo a reclamaciones de pago de pesos, daños y perjuicios, así
como la rescisión del mismo o bien la terminación del contrato
por la falta de entrega del inmueble materia del arrendamiento a su
vencimiento mediante el juicio correspondiente ante el juzgado
correspondiente, éste se obliga a pagar a </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> como pena
convencional un importe equivalente a</FONT><FONT FACE="Arial, serif">
</FONT><FONT FACE="Arial, serif"><B>(2) DOS</B></FONT><FONT FACE="Arial, serif">
</FONT><FONT FACE="Arial, serif">parcialidades de la renta anual
señalada en la </FONT><FONT FACE="Arial, serif"><B>cláusula
tercera</B></FONT><FONT FACE="Arial, serif"> del presente contrato,
por cada incumplimiento a lo convenido en el clausulado de este
contrato, por todo el tiempo que dure el juicio, su ejecución y
hasta que se haga entrega del bien inmueble arrendado o se haga pago
de las cantidades reclamadas.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>SEXTA.-
 PAGO DE SERVICIOS, IMPUESTOS Y CONTRIBUCIONES. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Convienen
expresamente las partes que </FONT><FONT FACE="Arial, serif"><B>“EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif"> se recibe
sin ayudantes o empleados, por lo que no existe ninguna relación
laboral en el presente arrendamiento, siendo por cuenta de </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> la
responsabilidad laboral, civil, administrativa, o penal que se dé
con motivo de la contratación de algún o algunos de los
empleados. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> se obliga, por
virtud de este contrato, a cubrir puntualmente el pago del servicio
de energía eléctrica, agua potable, teléfono, gas y demás
servicios que se consuman en </FONT><FONT FACE="Arial, serif"><B>“EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif"> objeto de
este Contrato. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">A
su vez, </FONT><FONT FACE="Arial, serif"><B>“EL ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">
se obliga a pagar el impuesto predial y demás contribuciones que
legalmente le correspondan en su calidad de propietario de</FONT><FONT FACE="Arial, serif"><B>
“EL INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif">. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>SÉPTIMA.
– CONSERVACIÓN  DEL INMUEBLE ARRENDADO. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">, en este acto,
se obliga durante la vigencia del presente contrato a la
conservación material de </FONT><FONT FACE="Arial, serif"><B>“EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif">, debiendo
avisar a </FONT><FONT FACE="Arial, serif"><B>“EL ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">
de cualquier contingencia que se presente y que pueda lesionar y/o
perjudicar a </FONT><FONT FACE="Arial, serif"><B>“EL INMUEBLE
ARRENDADO”</B></FONT><FONT FACE="Arial, serif">. Asimismo, se
compromete a la reparación de cualquier daño originado por mascotas
que se encuentren habitando el inmueble objeto del presente contrato.
</FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">, en este acto, se
obliga a reparar, cambiar o modificar, cualquier desperfecto o
avería que pueda derivarse del deterioro natural del uso a que se
destine a </FONT><FONT FACE="Arial, serif"><B>“EL INMUEBLE
ARRENDADO”</B></FONT><FONT FACE="Arial, serif">, garantizando la
adecuada habitación objeto del presente contrato</FONT><FONT FACE="Arial, serif"><B>.
</B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>OCTAVA.-
 MODIFICACIONES Y MEJORAS. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> podrá realizar
todas las modificaciones, mejoras y adiciones a </FONT><FONT FACE="Arial, serif"><B>“EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif"> a su costa
que sean previamente acordadas con </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">, quedando estás
en beneficio de </FONT><FONT FACE="Arial, serif"><B>“EL INMUEBLE
ARRENDADO”</B></FONT><FONT FACE="Arial, serif">, siendo causal de
rescisión del presente contrato el efectuarlas sin previa
aprobación por escrito. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">En
caso de que </FONT><FONT FACE="Arial, serif"><B>“EL ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">
realice instalaciones susceptibles de desmontarse, podrá éste
retirarlas y llevarlas consigo en cualquier momento, siempre y cuando
no se cambie o modifique la estuctura actual del inmueble lo cual se
verificará con el inventario fotográfico que se tomará a la firma
del presente contrato en </FONT><FONT FACE="Arial, serif"><B>“EL
INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif">. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>NOVENA.-
PROHIBICIONES. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> no podrá́:</FONT></P>
<OL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Subarrendar total o parcialmente </FONT><FONT FACE="Arial, serif"><B>“EL
	INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif">. </FONT>
	</P>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Traspasar o ceder expresa o tácitamente
	los derechos derivados de este Contrato. </FONT>
	</P>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Almacenar en </FONT><FONT FACE="Arial, serif"><B>“EL
	INMUEBLE ARRENDADO”</B></FONT><FONT FACE="Arial, serif"> objeto de
	este Contrato materiales explosivos o sustancias peligrosas o
	ilegales.</FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>DÉCIMA.-
OBLIGACIONES DEL ARRENDATARIO. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">En
este acto,</FONT><FONT FACE="Arial, serif"><B> “EL ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">
se obliga expresamente a lo siguiente:</FONT><FONT FACE="Arial, serif"><FONT SIZE=2><B>
</B></FONT></FONT>
</P>
<OL TYPE=a>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Pagar los daños y perjuicios que el
	inmueble arrendado sufra por su culpa o negligencia, la de sus
	familiares, invitados o empleados. </FONT>
	</P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=2>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">No almacenar sustancias o residuos
	peligrosos, aun en forma temporal, en el inmueble. </FONT>
	</P>
</OL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0in"><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=3>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Responder por incendio y cubrir los daños
	materiales y perjuicios que se causen, a no ser que provenga de caso
	fortuito, fuerza mayor o vicio de construcción. </FONT>
	</P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=4>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Pagar todos los servicios con los que
	cuente el inmueble, los use o no, tales como energía eléctrica,
	agua, teléfono, gas, televisión de paga y cualquier otro.</FONT></P>
</OL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0in"><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=5>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">En caso de no desear algún servicio,
	estará́ obligado a requerirle a </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> la cancelación
	de dichos servicios, por escrito y de manera indubitable, para
	quedar sin responsabilidad en el pago de los mismos. </FONT>
	</P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=6>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">No podrá́ contratar servicios
	adicionales sin conocimiento y consentimiento.</FONT></P>
</OL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0in"><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=7>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Entregar a </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> los recibos
	originales debidamente pagados de los servicios con los que cuente
	el inmueble.</FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=8>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Entregar el inmueble objeto de este
	contrato a más tardar el último día de su vigencia.</FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=9>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">No puede, sin consentimiento expreso de
	</FONT><FONT FACE="Arial, serif"><B>“EL ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">,
	variar la forma del inmueble arrendado. </FONT>
	</P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=10>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Poner en conocimiento de </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">, a la brevedad
	posible, la necesidad de las reparaciones derivadas de daños en la
	construcción o vicios ocultos, bajo pena de pagar los daños y
	perjuicios que su omisión cause.</FONT></P>
</OL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0in"><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=11>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	“<FONT FACE="Arial, serif"><B>EL ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">
	estará́ obligado a notificar a </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> de manera
	inmediata cualquier notificación, procedimiento o juicio que se
	inicie en su contra conforme a la Ley Nacional de Extinción de
	Dominio y proporcionar toda la información necesaria para defender
	los intereses de </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> y/o propietario o
	será causa de recisión de contrato.<BR></FONT><BR><BR>
	</P>
</OL>
<P STYLE="margin-bottom: 0in"><BR>
</P>
<P STYLE="margin-bottom: 0in"><FONT FACE="Arial, serif"><B>DÉCIMA
PRIMERA.- OBLIGACIONES DE EL ARRENDADOR. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">En
este acto, </FONT><FONT FACE="Arial, serif"><B>“EL ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">
se obliga expresamente a lo siguiente:</FONT></P>
<OL TYPE=a>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Entregar a </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> el inmueble
	arrendado en las condiciones pactadas. </FONT>
	</P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<OL TYPE=a START=2>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Entregar a </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> un recibo por
	el pago de la renta.</FONT></P>
</OL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
 
</P>
<P STYLE="margin-bottom: 0in"><FONT FACE="Arial, serif"><B>DÉCIMA
SEGUNDA.- EXTINCIÓN DE DOMINIO. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO” </B></FONT><FONT FACE="Arial, serif">declara bajo
protesta de decir verdad que de acuerdo con la Ley Nacional de
Extinción de Dominio y la Ley de Extinción de Dominio de la Ciudad
de México, únicamente destinaran </FONT><FONT FACE="Arial, serif"><B>“</B></FONT><FONT FACE="Arial, serif"><B>EL
INMUEBLE ARRENDADO” </B></FONT><FONT FACE="Arial, serif">a un fin
lícito, conviniendo que para el caso de que se llegase a dar mal
uso, e ilicitud a que se destine dicho inmueble, y/o en caso de
contravenir el contenido de esta cláusula, </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR” </B></FONT><FONT FACE="Arial, serif">se deslinda de
toda responsabilidad, manifestando </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO” </B></FONT><FONT FACE="Arial, serif">su conformidad
para que </FONT><FONT FACE="Arial, serif"><B>“EL ARRENDADOR”
</B></FONT><FONT FACE="Arial, serif">comunique de manera inmediata
una vez que tenga conocimiento de su actividad ilícita a la
autoridad correspondiente, para el efecto de que ésta ejerza las
acciones de investigación y se deslinde dicho inmueble de la
aplicación de las sanciones contenidas en la Ley en comento. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Asimismo,
manifiestan bajo protesta de decir verdad, que </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO” </B></FONT><FONT FACE="Arial, serif">tiene un modo de
vida honesto y lícito en virtud de lo anterior, exime de toda
responsabilidad a </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR” </B></FONT><FONT FACE="Arial, serif">para evento futuro
en que se pudiera generar por la comisión de algún ilícito y
que ninguna relación ilícita los une a </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Ambas
partes convienen en que está estrictamente prohibido ejecutar actos
que perturben la seguridad o tranquilidad de los otros vecinos;
igualmente cualquier acto u omisión que afecte o comprometa la
estabilidad, seguridad, higiene, salubridad o comodidad del inmueble.
</FONT><FONT FACE="Arial, serif"><B>“EL ARRENDATARIO” </B></FONT><FONT FACE="Arial, serif">se
obliga a acatar las reglas de convivencia que se acuerden con </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>DÉCIMA
TERCERA.- MODIFICACIÓN Y CESIÓN DE DERECHOS. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Las
partes convienen en que las modificaciones al presente contrato
deberán realizarse por medio de convenio modificatorio, el cual
deberá ser suscrito por ambas partes, por su propio derecho o a
través de sus representantes o apoderados legales, que cuenten con
facultades para ello. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Cualquier
modificación que se realice en contravención a lo estipulado en
esta cláusula, no tendrá efecto legal alguno y no podrán ser
reclamados derechos u obligaciones derivados del mismo. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> acepta que no
podrá ceder, ni total ni parcialmente, los derechos u obligaciones
a su cargo conforme al presente contrato (incluidos los pagos que se
adeuden o que se vayan a adeudar en un futuro) a ningún tercero. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>DÉCIMA
CUARTA.-  NOTIFICACIONES Y DOMICILIOS</B></FONT><FONT FACE="Arial, serif">.
</FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Todas
las notificaciones o avisos que se tengan que dar entre las partes en
cumplimiento a lo aquí establecido, se harán por correo
certificado, con la confirmación de su recepción en los
domicilios y con atención a las personas que a continuación se
mencionan: </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><BR><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"><FONT SIZE=2 STYLE="font-size: 11pt"><B>
</B></FONT></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>Vasco
de Quiroga número 4309</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Interior 2002</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Colonia Santa Fe</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Alcaldía Cuajimalpa</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Código Postal 05348</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Ciudad de México</B></FONT><FONT FACE="Arial, serif">.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO” </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0in; background: #ffffff"><FONT FACE="Arial, serif"><B>Calle
Manantial Oriente número 23</B></FONT><FONT FACE="Arial, serif">,
</FONT><FONT FACE="Arial, serif"><B>Fraccionamiento los Clubes</B></FONT><FONT FACE="Arial, serif">,
</FONT><FONT FACE="Arial, serif"><B>Atizapán de Zaragoza</B></FONT><FONT FACE="Arial, serif">,
</FONT><FONT FACE="Arial, serif"><B>Código Postal 52958</B></FONT><FONT FACE="Arial, serif">,
</FONT><FONT FACE="Arial, serif"><B>Estado de México</B></FONT><FONT FACE="Arial, serif">.</FONT><FONT FACE="Arial, serif"><B>
</B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Para
el caso de que alguna de las partes llegará a cambiar su domicilio,
deberá notificar de este hecho a la otra parte con por lo menos 15
(quince) días naturales de anticipación, en caso contrario todas
las notificaciones realizadas en el último domicilio señalado,
aun las de carácter personal, surtirán todos sus efectos legales.
</FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>DÉCIMA
QUINTA.-  RELACIONES DE LAS PARTES. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Nada
contenido en este instrumento será considerado o interpretado por
las partes o cualquier tercero como creador de una relación de
socios o asociados en participación o de asociación entre </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif"> y </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>DÉCIMA
SEXTA.-  ACUERDO TOTAL DE LAS PARTES. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Tanto
</FONT><FONT FACE="Arial, serif"><B>“EL ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">
como </FONT><FONT FACE="Arial, serif"><B>“EL ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">,
convienen expresamente que cualquier otro convenio, contrato,
acuerdo, ya sea verbal o escrito, celebrado entre las partes
contratantes con anterioridad al presente instrumento, quedará sin
efecto alguno y por lo tanto será nulo de pleno derecho, debido a
que este contrato será el que, a partir de su firma, esté vigente
y regirá las relaciones contractuales futuras entre las partes
firmantes. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>DÉCIMA
SÉPTIMA.- MAYÚSCULAS Y TÍTULOS. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Las
mayúsculas y títulos de cada cláusula o inciso utilizadas en el
presente contrato se incorporaron al mismo con el propósito de
referencia, y de ninguna forma deberá considerarse que afecten el
contenido o interpretación del presente contrato. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>DÉCIMA
OCTAVA.- LEGISLACIÓN Y JURISDICCIÓN </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">&quot;</FONT><FONT FACE="Arial, serif"><B>EL
ARRENDADOR</B></FONT><FONT FACE="Arial, serif">&quot; y &quot;</FONT><FONT FACE="Arial, serif"><B>EL
ARRENDATARIO</B></FONT><FONT FACE="Arial, serif">&quot; de común
acuerdo se someten para la interpretación y cumplimiento del
presente contrato a lo que dispone las Leyes de la Ciudad de México
y a la jurisdicción de los Tribunales del fuero común de la Ciudad
de México, renunciando expresamente al fuero o fueros que pudieran
corresponderles en razón de sus domicilios presente o futuros o
bien por cualquier otra causa.</FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Así
mismo &quot;</FONT><FONT FACE="Arial, serif"><B>EL ARRENDADOR</B></FONT><FONT FACE="Arial, serif">&quot;
y &quot;</FONT><FONT FACE="Arial, serif"><B>EL ARRENDATARIO</B></FONT><FONT FACE="Arial, serif">&quot;
se someten a lo estipulado por las normas para la Ciudad de México,
para dirimir cualquier controversia o conflicto que se derive del
presente contrato. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Si
alguna cláusula de estos términos y condiciones se declara nula o
inaplicable en virtud de la legislación aplicable, las demás
cláusulas mantendrán su vigor. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>DÉCIMA
NOVENA.- RESCISIÓN.</B></FONT><FONT FACE="Arial, serif"><FONT SIZE=2 STYLE="font-size: 11pt">
</FONT></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>SON
CAUSALES DE RESCISIÓN DEL PRESENTE CONTRATO.</B></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>1.
</B></FONT><FONT FACE="Arial, serif">Será causa de rescisión del
presente contrato sin responsabilidad para las partes:</FONT></P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Si el inmueble arrendado es expropiado por
	causa de utilidad pública.</FONT></P>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Si por caso fortuito o fuerza mayor se
	impide totalmente a </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> el uso de la
	cosa arrendada.</FONT></P>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">La falsedad en las declaraciones vertidas
	en este contrato, por cualquiera de las partes.</FONT></P>
</UL>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>2.
</B></FONT><FONT FACE="Arial, serif">Será causa de rescisión de
este contrato, sin responsabilidad para </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">, cuando </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">:</FONT></P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Incumpla con alguna de las obligaciones
	contraídas específicamente en la </FONT><FONT FACE="Arial, serif"><B>CLÁUSULA
	DÉCIMA</B></FONT><FONT FACE="Arial, serif"> de este contrato.</FONT></P>
</UL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Abandone el inmueble materia de
	arrendamiento.</FONT></P>
</UL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0in"><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Subarriende, ceda u otorgue el inmueble
	arrendado.</FONT></P>
</UL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	<FONT FACE="Arial, serif">Será causa de rescisión del presente
	contrato, sin necesidad de declaración judicial, cualquier
	indagatoria o carpeta de investigación levantada en términos de la
	Ley Nacional de Extinción de Dominio, así como el solo hecho de
	que el inmueble sea resguardado, relacionado, investigado o
	asegurado por cualquier autoridad derivado de la sospecha o
	comprobación de la comisión de delitos consumados o intentados
	dentro o fuera del inmueble, cometidos por </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">, o por
	cualquier persona a la que </FONT><FONT FACE="Arial, serif"><B>“EL
	ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> o que por sí,
	haya intervenido y se le haya permitido la entrada al inmueble
	arrendado que pudiera ser constitutivo de delitos previstos en la
	Ley Nacional de Extinción de Dominio. </FONT>
	</P>
</UL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0in"><A NAME="_GoBack"></A>
<BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-top: 0.19in; margin-bottom: 0.19in">
<BR><BR>
</P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
	“<FONT FACE="Arial, serif"><B>EL ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif">
	queda obligado a entregar de inmediato el inmueble objeto del
	arrendamiento, una vez que se presente cualquiera de las causas de
	rescisión señaladas en el inciso anterior.</FONT></P>
</UL>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>3.
</B></FONT><FONT FACE="Arial, serif">En caso de incumplimiento de
cualquiera de las obligaciones contenidas en este documento, la parte
afectada podrá rescindir el presente contrato. </FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif">Leído
el presente contrato por las partes que en el intervienen y enterados
y conformes de toda su fuerza y alcance legales, lo ratifican y
firman en la Ciudad de México por cuadruplicado, el </FONT><FONT FACE="Arial, serif"><B>28
de diciembre de 2020. </B></FONT>
</P>
<P ALIGN=JUSTIFY STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><BR><BR>
</P>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in">“<FONT FACE="Arial, serif"><B>EL
ARRENDADOR”</B></FONT></P>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><FONT FACE="Arial, serif"><B>_____________________________</B></FONT></P>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in; border-top: none; border-left: none; border-right: none; padding-top: 0in; padding-bottom: 0.43in; padding-left: 0in; padding-right: 0in">
<FONT FACE="Arial, serif"><B>ARACELI HURTADO FEREGRINO.</B></FONT></P>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in; border-top: none; border-left: none; border-right: none; padding-top: 0in; padding-bottom: 0.43in; padding-left: 0in; padding-right: 0in">
<BR><BR>
</P>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in; border-top: none; border-left: none; border-right: none; padding-top: 0in; padding-bottom: 0.43in; padding-left: 0in; padding-right: 0in">
“<FONT FACE="Arial, serif"><B>EL ARRENDATARIO”</B></FONT>
</P>
<div style="position:relative;text-align:center">${
    isEmpty(signature)
      ? ""
      : `<img src=${signature} alt="Firma" style="position:absolute;top: -75px;right: 175px;"/>`
  }</div>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in; border-top: none; border-left: none; border-right: none; padding-top: 0in; padding-bottom: 0.43in; padding-left: 0in; padding-right: 0in">
<FONT FACE="Arial, serif"><B>________________________________</B></FONT></P>
<P ALIGN=CENTER STYLE="margin-top: 0.19in; margin-bottom: 0.19in; border-top: none; border-left: none; border-right: none; padding-top: 0in; padding-bottom: 0.43in; padding-left: 0in; padding-right: 0in">
<FONT FACE="Arial, serif"><B>MANUEL FEDERICO SABORIT GARCÍA PEÑA</B></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0in"><BR>
</P>
<P ALIGN=CENTER STYLE="margin-bottom: 0in"><FONT FACE="Arial, serif"><FONT SIZE=5><B>ANEXO
2</B></FONT></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0in"><BR>
</P>
<P STYLE="margin-bottom: 0in"><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0in; line-height: 0.22in">“<FONT FACE="Arial, serif"><B>EL
ARRENDATARIO”</B></FONT><FONT FACE="Arial, serif"> manifiesta que
el inmueble arrendado ubicado en </FONT><FONT FACE="Arial, serif"><B>Vasco
de Quiroga número 4309</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Interior 2002</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Colonia Santa Fe</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Alcaldía Cuajimalpa</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Código Postal 05348</B></FONT><FONT FACE="Arial, serif">,</FONT><FONT FACE="Arial, serif"><B>
Ciudad de México</B></FONT><FONT COLOR="#000000"><FONT FACE="Arial, serif"><SPAN STYLE="background: #ffffff">,</SPAN></FONT></FONT><FONT FACE="Arial, serif">
</FONT><FONT FACE="Arial, serif">será ocupado por sus hijos de
nombres </FONT><FONT FACE="Arial, serif"><B>ALÍA SABORIT LAMMEL</B></FONT><FONT FACE="Arial, serif">
</FONT><FONT FACE="Arial, serif"><B>y MANUEL SABORIT LAMMEL</B></FONT><FONT FACE="Arial, serif">,
por lo que cualquier inconformidad por parte de </FONT><FONT FACE="Arial, serif"><B>“EL
ARRENDADOR”</B></FONT><FONT FACE="Arial, serif">, en relación a
las ocupantes del bien inmueble arrendado, se comunicara de manera
inmediata al arrendatario, para que tome las medidas necesarias para
la resolución del problema</FONT>.</P>
<DIV TYPE=FOOTER>
	<P STYLE="margin-top: 0.45in; margin-bottom: 0in"><BR>
	</P>
</DIV>
</BODY>
</HTML>`;

  console.log("signature", signatureRef);

  return (
    <div
      style={{
        padding: "3% 5%",
        position: "relative",
      }}
    >
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={() => {
          const signatureBase64 = signatureRef.current.toDataURL();
          setSignature(signatureBase64);
          setIsModalVisible(!isModalVisible);
        }}
        onCancel={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <SignatureCanvas
          penColor="green"
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
          ref={signatureRef}
        />
      </Modal>
      <button
        style={{ position: "absolut", bottom: 10 }}
        type="button"
        onClick={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        Firmar contrato
      </button>
      <div
        dangerouslySetInnerHTML={{ __html: stringSignature }}
        style={{
          maxHeight: 400,
          overflowY: "scroll",
          background: "white",
          padding: "0% 3%",
        }}
      />
    </div>
  );
};

export default SgnatureIndex;
