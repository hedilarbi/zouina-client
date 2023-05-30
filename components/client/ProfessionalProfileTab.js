import React from "react";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import ProfessionalComments from "./ProfessionalComments";
import ProfessionalGallery from "./ProfessionalGallery";

// const renderScene = SceneMap({
//   first: ProfessionalGallery,
//   second: ProfessionalComments,
// });

const ProfessionalProfileTab = ({ gallery, comments }) => {
  const layout = useWindowDimensions();
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <ProfessionalGallery gallery={gallery} />;
      case "second":
        return <ProfessionalComments comments={comments} />;
    }
  };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Gallery" },
    { key: "second", title: "Comments" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "white", shadowColor: "transparent" }}
          swipeEnabled
          labelStyle={{ color: "black", fontFamily: "Montserrat-Medium" }}
          indicatorStyle={{ backgroundColor: "#BD72C8" }}
          activeColor="#BD72C8"
        />
      )}
    />
  );
};

export default ProfessionalProfileTab;
