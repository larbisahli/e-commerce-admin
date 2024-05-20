import { useMutation, useQuery } from '@apollo/client';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { HERO_BANNER_LIST, UPDATE_HERO_SLIDE } from '@graphql/hero-banner';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { LanguageProps, SSRProps } from '@ts-types/custom.types';
import { HeroBannerType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import FormActions from '../../helpers/FormActions';
import HeroBannerList from './hero-banner-list';

const CreateOrUpdateSlideForm = dynamic(() => import('./hero-slide-form'), {
  ssr: true,
  loading: () => <Loader special />
});

interface THeroBanner {
  heroSlideList: HeroBannerType[];
  heroSlideListCount: { count: number };
}

interface OptionsVariable extends LanguageProps {
  page: number;
  limit: number;
}

export default function CreateOrUpdateHeroSlideForm({ client }: SSRProps) {
  const { selectedLanguage } = useSettings();

  const [sliderId, setSliderId] = useState(null);
  const [error, setError] = useState(null);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const {
    data,
    loading,
    error: queryError
  } = useQuery<THeroBanner, OptionsVariable>(HERO_BANNER_LIST, {
    variables: {
      page: 1,
      limit: 999,
      language: selectedLanguage
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
  });

  const [updateHeroSlider, { loading: updating, reset: resetUpdateMutation }] =
    useMutation(UPDATE_HERO_SLIDE, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateHeroSlide: HeroBannerType }) => {
        const { id } = data.updateHeroSlide;
        if (!id) {
          return;
        }
        notify(t('common:successfully-created'), 'success');
      }
    });

  const { heroSlideList = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(queryError);
  useErrorLogger(error);

  const handleEdit = (id: string) => {
    setSliderId(id);
  };

  const handleDelete = (id: string) => {
    setSliderId(id);
  };

  const handleBack = () => {
    setSliderId(null);
  };

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(values.thumbnail)) {
      notify('form:category-image-required', 'warning');
      return;
    }

    const variables = {
      title: values.title,
      url: values.url,
      thumbnail: [
        {
          id: values.thumbnail[0]?.id
        }
      ],
      description: values.description,
      btnLabel: values.btnLabel,
      position: Number(values.position),
      published: values.status === 'publish',
      language: selectedLanguage,
      align: values.align,
      styles: {
        textColor: values.styles.textColor,
        btnBgc: values.styles.btnBgc,
        btnTextColor: values.styles.btnTextColor
      }
    };

    updateHeroSlider({
      variables: { ...variables }
    }).catch((err) => {
      setError(err);
    });
  };

  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="">
      <FormActions title="Hero sliders" handleBack={sliderId && handleBack} />
      {!sliderId ? (
        <HeroBannerList
          loading={loading}
          heroBannerList={heroSlideList}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <CreateOrUpdateSlideForm initialValues={{}} onSubmit={onSubmit} />
      )}
    </div>
  );
}
