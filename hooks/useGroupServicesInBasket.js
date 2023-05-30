import React, { useState, useEffect } from "react";

const useGroupServicesInBasket = (services) => {
  const [groupedServicesInBasket, setGroupedServicesInBasket] = useState([]);
  const groupServicesInBasket = () => {
    const groupedServices = services.reduce((results, service) => {
      (results[service.id] = results[service.id] || []).push(service);
      return results;
    }, {});
    setGroupedServicesInBasket(groupedServices);
  };
  useEffect(() => {
    groupServicesInBasket();
  }, [services]);
  return groupedServicesInBasket;
};

export default useGroupServicesInBasket;
