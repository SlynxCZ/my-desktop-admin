"use client";

import React, {useEffect} from "react";
import DatabaseConnectForm from "@/components/DatabaseConnectForm";
import {useDynamicComponent} from "@/utils/DynamicComponent";

export default function Home() {
  const { activeComponent, setActiveComponent } = useDynamicComponent();

  useEffect(() => {
    if (!activeComponent) {
      setActiveComponent(<DatabaseConnectForm />);
    }
  }, [activeComponent, setActiveComponent]);

  return activeComponent;
}
