import { useEffect, useRef, useState } from 'react';
// import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BackupDBForm({ className = '', status }) {
    const [confirmingBackupDB, setconfirmingBackupDB] = useState(false);
    const passwordInput = useRef();
    
    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset,
    } = useForm({
        password: '',
    });

    const confirmBackupDB = () => {
        setconfirmingBackupDB(true);
    };

    const backupDatabase = (e) => {
        e.preventDefault();

        post(route('profile.backup'), {
            data: {
                password: data.password,
            },
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const closeModal = () => {
        setconfirmingBackupDB(false);

        // reset();
    };

    // Show alert when status changes
    useEffect(() => {
        if (status) {
            alert(status);
        }
    }, [status]);

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Backup Database</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your database is backed up, all of its resources and data will be saved.
                </p>
            </header>

            <PrimaryButton onClick={confirmBackupDB}>Backup Database</PrimaryButton>

            <Modal show={confirmingBackupDB} onClose={closeModal}>
                <form onSubmit={backupDatabase} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to backup your database?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your database is backed up, all of its resources and data will be saved. Please
                        enter your password to confirm you would like to backup your database.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Backup Database
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
