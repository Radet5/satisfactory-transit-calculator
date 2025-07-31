import { useState, type PropsWithChildren } from "react";
import './collapsible-container.css';

interface ICollapsibleContainer {
  title?: string;
  mobile?: boolean;
  startClosed?: boolean;
  closeOnClick?: boolean;
}

export const CollapsibleContainer = ({ title, mobile, startClosed, closeOnClick, children }: PropsWithChildren<ICollapsibleContainer>) => {
  const [itemListClosed, setItemListClosed] = useState(startClosed);
  const titleClass = `${mobile?'mobile-':''}collapsible-scroll-container__cover-title${itemListClosed?` ${mobile?'mobile-':''}collapsible-scroll-container__cover-title--closed`:''}`;
  const containerClass = `${mobile?'mobile-':''}collapsible-scroll-container${itemListClosed?` ${mobile?'mobile-':''}collapsible-scroll-container--closed`:''}`;
  const buttonClass = `${mobile?'mobile-':''}collapsible-scroll-container__button`;

  const onClick = () => closeOnClick ? setItemListClosed(true) : null;

  return (
    <div>
      <div
        onClick={()=>setItemListClosed(!itemListClosed)}
        className={titleClass}
      >
        {title ? title : ''}
      </div>
      <div className={containerClass} onClick={()=>onClick()}>
        {children}
      </div>
      <div
        onClick={()=>setItemListClosed(!itemListClosed)}
        className={buttonClass}
      >
        {itemListClosed ? <>&darr;</> : <>&uarr;</>}
      </div>
    </div>
  );
};

