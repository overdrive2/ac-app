import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { dashboard, repository } from '@/routes';
import departments from '@/routes/departments';
import positions from '@/routes/positions';
import vendors from '@/routes/vendors';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Briefcase, Building2, PersonStanding, Save, Store } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Repository',
        href: '',
    }
];

export default function Repository() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="auto-rows-min gap-4 flex flex-wrap">
                    <a href={vendors.index().url} rel="noopener noreferrer">
                        <Button
                            className={cn(
                                "flex h-auto flex-col items-center justify-center gap-1 py-3 px-4 w-24"
                            )}
                            variant="outline"
                        >
                            <Store className="h-5 w-5" />
                            <span className="text-xs">Vendors</span>
                        </Button>
                    </a>
                    <a href={positions.index().url} rel="noopener noreferrer">
                        <Button
                            className={cn(
                                "flex h-auto flex-col items-center justify-center gap-1 py-3 px-4 w-24"
                            )}
                            variant="outline"
                        >
                            <Briefcase className="h-5 w-5" />
                            <span className="text-xs">Position</span>
                        </Button>
                    </a>
                    <a href={departments.index().url} rel="noopener noreferrer">
                        <Button
                            className={cn(
                                "flex h-auto flex-col items-center justify-center gap-1 py-3 px-4 w-24"
                            )}
                            variant="outline"
                        >
                            <Building2 className="h-5 w-5" />
                            <span className="text-xs">Department</span>
                        </Button>
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
