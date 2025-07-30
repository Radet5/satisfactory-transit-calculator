import axios from "axios";
import { useEffect } from "react";
import { useDataContext } from "../context/data-context";

const dataCookieName = 'localSatisfactoryData';
export const DataRetrival = () => {
  const { data, setData } = useDataContext();
  
  useEffect(() => {
    const localData = localStorage.getItem(dataCookieName);
    if (localData) {
      let parsed;
      try {
        parsed = JSON.parse(localData);
      } catch (e) {
        console.error(e);
      }

      if (parsed) setData(parsed);
    }
  }, []);

  const getData = () => {
    axios.get("https://factoriolab.github.io/data/sfy/data.json")
      .then((response) => {
        localStorage.setItem(dataCookieName, JSON.stringify(response.data));
        setData(response.data);
      })
      .catch((err) => console.error(err));
  }

  return <button onClick={getData}>{data ? "Refresh Data" : "Get Data"}</button>
};

