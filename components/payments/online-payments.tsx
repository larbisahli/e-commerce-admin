import Button from "@components/ui/button";
import SwitchInput from "@components/ui/switch-input";
import { ROUTES } from "@utils/routes";
import { isEmpty } from "lodash";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";


type FormValues = any

const defaultValues = null

const OnlinePayments = ({ initialValues }) => {
    const { t } = useTranslation();

    const {
        control,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: isEmpty(initialValues) ? defaultValues : initialValues
    });

    const checkOfflineAvailability = (name) => {
        return initialValues[name] && initialValues[name].id
    }

    return <section className="mt-20 rounded-md border bg-white p-5 shadow-sm">
        <div className="border-b pb-5 flex items-center">
            <h2 className='font-medium text-lg text-gray-700'>Online Payment Methods</h2>
            <span className="mx-2 text-blue-600 font-medium uppercase">Coming soon</span>
        </div>
        <div className='relative flex justify-between items-center py-5 pb-2 opacity-50'>
            <div className="top-0 left-0 right-0 bottom-0 absolute"></div>
            <Image alt="paypal-logo" src={'/static/images/paypal_logo.svg'} width={100} height={100}/>
            <div className="flex justify-center items-center">
                {checkOfflineAvailability('paypal') && <div className="mr-3">
                <SwitchInput
                    name="paypal.active"
                    label=""
                    control={control}
                    size="large"
                />
                </div>}
                <Link href={`${ROUTES.PAYMENT}/paypal`}>
                    <Button
                        variant="outline"
                        type="button"
                        className='!text-blue-600 hover:!text-white !border-blue-600 !rounded-md'
                    >
                        {checkOfflineAvailability('bankDeposit') ? <span>Edit</span>: <span>Set up</span>}
                    </Button>
                </Link>
            </div>
        </div>
    </section>
}

export default OnlinePayments