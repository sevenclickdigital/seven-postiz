'use client';

import { FC, useEffect, useState } from 'react';
import { MultiSelect } from '@gitroom/react/form/multi.select';
import { useCustomProviderFunction } from '@gitroom/frontend/components/launches/helpers/use.custom.provider.function';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

// Same shape as the WordPress terms field, but the ids stay strings - a generic
// API can key its categories however it wants. Selecting nothing leaves an
// empty array, which the provider omits from the payload entirely.
export const ArticleApiCategories: FC<{
  name: string;
  onChange: (event: {
    target: {
      value: string[];
      name: string;
    };
  }) => void;
}> = (props) => {
  const { name, onChange } = props;
  const t = useT();
  const customFunc = useCustomProviderFunction();
  const form = useSettings();
  const { getValues } = form;
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selected, setSelected] = useState<Array<string | number>>([]);

  useEffect(() => {
    customFunc.get('categoriesList').then((data) => setCategories(data || []));
    const settings = getValues()[name];
    if (Array.isArray(settings)) {
      setSelected(settings.map((value: any) => String(value)));
    }
  }, []);

  const onChangeInner = (value: Array<string | number>) => {
    const strings = value.map((current) => String(current));
    setSelected(strings);
    form.setValue(name, strings, { shouldValidate: true });
    onChange?.({ target: { name, value: strings } });
  };

  if (!categories.length) {
    return null;
  }

  return (
    <MultiSelect
      name={name}
      label={t('categories', 'Categories')}
      value={selected}
      onChange={onChangeInner}
      options={categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))}
    />
  );
};
