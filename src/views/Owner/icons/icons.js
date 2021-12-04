const IconCheck = (
  <i
    className="fa fa-check"
    style={{
      color: "#39B54A",
    }}
  ></i>
);

const IconTimes = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.9972 5.99658L6.0022 8.99158"
      stroke="#DA1414"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.99823 8.99349L6.00073 5.99536"
      stroke="#DA1414"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.2091 1.71875H4.79099C2.90287 1.71875 1.71912 3.05562 1.71912 4.9475V10.0525C1.71912 11.9444 2.89724 13.2812 4.79099 13.2812H10.2085C12.1029 13.2812 13.2816 11.9444 13.2816 10.0525V4.9475C13.2816 3.05562 12.1029 1.71875 10.2091 1.71875Z"
      stroke="#DA1414"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const IconClock = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.2091 1.71875H4.79099C2.90287 1.71875 1.71912 3.05562 1.71912 4.9475V10.0525C1.71912 11.9444 2.89662 13.2812 4.79099 13.2812H10.2085C12.1029 13.2812 13.2816 11.9444 13.2816 10.0525V4.9475C13.2816 3.05562 12.1029 1.71875 10.2091 1.71875Z"
      stroke="#BE0FFF"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.6195 8.76099L7.50012 7.49662V4.771"
      stroke="#BE0FFF"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const objectIcons = { ["fa fa-check"]: IconCheck, IconTimes, IconClock };

export default objectIcons;
