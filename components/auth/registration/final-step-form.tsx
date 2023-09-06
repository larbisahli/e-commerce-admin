import LetterOpen from '@components/icons/letter-open';
import { PartyPopper } from '@components/icons/party-popper';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const FinalStepForm = () => {
  const { t } = useTranslation();

  const [{ width, height }, setDimensions] = useState({
    width: 1000,
    height: 1000
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setDimensions({ width: window?.innerWidth, height: window?.innerHeight });
  }, []);

  return (
    <div className="mb-8 h-full">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          onConfettiComplete={(confetti) => {
            setShowConfetti(false);
            confetti.reset();
          }}
          recycle={false}
        />
      )}
      <div className="flex flex-col items-center justify-center">
        <PartyPopper />
        <h1 className="my-5 text-2xl font-bold text-gray-700">
          {t('common:congrats')}
        </h1>
        <p className="text-sm text-gray-700">
          {"You're now just one step away from realizing your dream business."}
        </p>
      </div>

      <div className="mt-16 mb-32">
        <div className="flex items-center rounded-md border p-5">
          <div className="mr-5 text-blue-500">
            <LetterOpen />
          </div>
          <div className="text-sm text-gray-500">
            {
              "Remember to check your inbox – we've sent you a link to verify your account."
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalStepForm;
