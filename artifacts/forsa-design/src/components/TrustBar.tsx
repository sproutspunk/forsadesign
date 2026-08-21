import { useLanguage } from "@/contexts/LanguageContext";

const GREEN = "#34d399";

const metrics = [
  {
    key: "desktop",
    labelKey: "trustBar.desktop",
    value: "100 / 100",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={GREEN}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    key: "mobile",
    labelKey: "trustBar.mobile",
    value: "95 / 100",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={GREEN}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    key: "ssl",
    labelKey: "trustBar.ssl",
    value: "Grade A+",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={GREEN}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    key: "observatory",
    labelKey: "trustBar.observatory",
    value: "105 / 100",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 3.8H7C5.78497 3.8 4.8 4.78497 4.8 6V15.7647C4.8 16.574 5.24438 17.318 5.95698 17.7017L10.957 20.394C11.6081 20.7446 12.3919 20.7446 13.043 20.394L18.043 17.7017C18.7556 17.318 19.2 16.574 19.2 15.7647V6C19.2 4.78497 18.215 3.8 17 3.8ZM7 2C4.79086 2 3 3.79086 3 6V15.7647C3 17.2362 3.80796 18.5889 5.1036 19.2866L10.1036 21.9789C11.2875 22.6164 12.7125 22.6164 13.8964 21.9789L18.8964 19.2866C20.192 18.5889 21 17.2362 21 15.7647V6C21 3.79086 19.2091 2 17 2H7Z"
          fill={GREEN}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7248 8.63051C17.0763 8.98198 17.0763 9.55183 16.7248 9.9033L11.7627 14.8654C11.4113 15.2169 10.8414 15.2169 10.4899 14.8654L7.81839 12.1939C7.46692 11.8424 7.46691 11.2726 7.81839 10.9211C8.16986 10.5696 8.7397 10.5696 9.09118 10.9211L11.1263 12.9562L15.4521 8.63051C15.8035 8.27904 16.3734 8.27904 16.7248 8.63051Z"
          fill={GREEN}
        />
      </svg>
    ),
  },
  {
    key: "co2",
    labelKey: "trustBar.co2",
    value: "0.07 g",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={GREEN}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22c4.97-4.97 8-9.5 8-13.5A7.5 7.5 0 0 0 4.5 8.5C4.5 12.5 7.53 17.03 12 22z" />
        <path d="M12 22V8.5" />
      </svg>
    ),
  },
  {
    key: "a11y",
    labelKey: "trustBar.a11y",
    value: "100 / 100",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={GREEN}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

export default function TrustBar() {
  const { t } = useLanguage();

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {/* metric badges */}
      <div className="flex flex-wrap justify-center gap-3" role="list">
        {metrics.map(({ key, labelKey, value, icon }) => {
          const isCo2 = key === "co2";
          const Tag = isCo2 ? "a" : "div";
          return (
            <Tag
              key={key}
              role="listitem"
              {...(isCo2
                ? {
                    href: "https://digitalbeacon.co/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {})}
              className={`flex items-center gap-2.5 px-4 py-3 border border-slate-400/15 rounded-lg${isCo2 ? " hover:border-slate-400/30 transition-colors" : ""}`}
            >
              {icon}
              <div>
                <div className="text-[11px] text-foreground/40 uppercase tracking-[0.07em] leading-none mb-1">
                  {t(labelKey)}
                </div>
                <div className="text-[15px] font-medium text-slate-100 leading-none">{value}</div>
              </div>
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
