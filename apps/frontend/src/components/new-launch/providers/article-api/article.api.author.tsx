'use client';

import { FC, useEffect, useState } from 'react';
import { Select } from '@gitroom/react/form/select';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { useCustomProviderFunction } from '@gitroom/frontend/components/launches/helpers/use.custom.provider.function';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';

// Loads the authors of the connected API. When the channel was connected
// without an authors URL the list comes back empty and the field disappears,
// so the payload simply never carries an author.
export const ArticleApiAuthor: FC<{
  name: string;
  onChange: (event: {
    target: {
      value: string;
      name: string;
    };
  }) => void;
}> = (props) => {
  const { onChange, name } = props;
  const t = useT();
  const customFunc = useCustomProviderFunction();
  const [authors, setAuthors] = useState([]);
  const { getValues } = useSettings();
  const [current, setCurrent] = useState<string | undefined>();
  const onChangeInner = (event: {
    target: {
      value: string;
      name: string;
    };
  }) => {
    setCurrent(event.target.value);
    onChange(event);
  };
  useEffect(() => {
    customFunc.get('authorsList').then((data) => setAuthors(data || []));
    const settings = getValues()[name];
    if (settings) {
      setCurrent(settings);
    }
  }, []);
  if (!authors.length) {
    return null;
  }
  return (
    <Select
      name={name}
      label={t('author', 'Author')}
      onChange={onChangeInner}
      value={current}
    >
      <option value="">{t('select_1', '--Select--')}</option>
      {authors.map((author: any) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))}
    </Select>
  );
};
