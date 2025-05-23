"use client";
import React, { Fragment, useEffect } from "react";
import styles from "./SplashScreen.module.scss";
import clsx from "clsx";
import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "@/services/httpRequest";
import usersService from "@/services/admin/usersService";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/atoms/user";
import { usePathname } from "next/navigation";

const SplashScreen: React.FC = () => {
  const pathname = usePathname();
  const setUser = useSetAtom(userAtom);

  const skipSplash = pathname === "/login" || pathname === "/register";

  const {
    data: profileData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["GetProfile"],
    queryFn: () =>
      httpRequest({
        http: usersService.GetProfileAccount(),
      }),
    enabled: !skipSplash,
    staleTime: 1000 * 60 * 5, // ✅ tránh gọi lại trong 5 phút
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && profileData) {
      setUser({
        id: profileData._id,
        username: profileData.username,
        role: profileData.role,
      });
    }
  }, [isSuccess, profileData, setUser]);

  // ✅ bỏ qua hoàn toàn nếu ở login/register hoặc đã load xong
  if (skipSplash || !isLoading) return null;

  return (
    <Fragment>
      <div className={clsx(styles.container)}>
        <div>
          <Spin tip={`Loading...`} size="large">
            <div
              style={{
                padding: 50,
                borderRadius: 4,
              }}
            ></div>
          </Spin>
        </div>
      </div>
    </Fragment>
  );
};

export default SplashScreen;
