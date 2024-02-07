import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetLocale, useSetLocale } from "@refinedev/core";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import { useTranslation } from "react-i18next";
import { configs as localeConfigs } from "../../i18n";

export const LanguageSelector: React.FC<
  RefineThemedLayoutV2HeaderProps
> = () => {
  const { i18n } = useTranslation();
  const changeLanguage = useSetLocale();
  const locale = useGetLocale()();

  const items: MenuProps["items"] = [...(i18n.languages || [])]
    .sort()
    .map((lang: string) => ({
      key: lang,
      label: localeConfigs[lang].name,
      icon: (
        <span style={{ marginRight: 8 }}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`} />
        </span>
      ),
      onClick: () => changeLanguage(lang),
    }));

  return (
    <Dropdown
      menu={{
        items: items,
        selectedKeys: locale ? [locale] : [],
      }}
    >
      <Button type="text">
        <Space>
          <Avatar size={16} src={`/images/flags/${locale}.svg`} />
          {localeConfigs[String(locale)].name}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};
