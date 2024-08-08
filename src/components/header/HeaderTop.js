import React from "react";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch,
  borderStyle,
}) => {
  return (
    <div
      className={`header-top-wap ${
        borderStyle === "fluid-border" ? "border-bottom" : ""
      }`}
    >
      {/* <LanguageCurrencyChanger
        currency={currency}
        setCurrency={setCurrency}
        currentLanguageCode={currentLanguageCode}
        dispatch={dispatch}
      /> */}
      <div className="header-offer">
        <p>
          Free delivery on order over{" "}
          <span>
            {currency.currencySymbol + (200 * currency.currencyRate).toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default HeaderTop;
