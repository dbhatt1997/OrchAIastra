import { css } from "@emotion/css";
import { CSSObject } from "@emotion/react";

type StyleCallback<Props> = (props: Props) => CSSObject;
type StyleValue<Props> = CSSObject | StyleCallback<Props>;
type StylesMap<Props> = Record<string, StyleValue<Props>>;
type GeneratedStyles = Record<string, string>;

interface MakeStylesOptions {
  classNamePrefix?: string;
}

export function makeStyles<Props = {}>(
  callback: () => StylesMap<Props>,
  options?: MakeStylesOptions
) {
  return (props: Props = {} as Props): GeneratedStyles => {
    const rawStyles = callback();
    const styles: GeneratedStyles = {};

    for (const key in rawStyles) {
      let rawStyle = rawStyles[key];

      if (typeof rawStyle === "function") {
        rawStyle = rawStyle(props);
      }

      styles[key] = css(
        rawStyle,
        options?.classNamePrefix
          ? { label: `${options.classNamePrefix}-${key}` }
          : undefined
      );
    }

    return styles;
  };
}
