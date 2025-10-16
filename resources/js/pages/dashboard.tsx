import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingDown, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    }
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-4 gap-4 px-4 lg:px-6">
                    {/* Card 1: Total Revenue */}
                    <Card className="flex flex-col justify-between shadow-sm bg-gradient-to-b from-card/80 to-muted">
                        <CardHeader>
                            <CardDescription className="text-base">ใหม่ในปี</CardDescription>
                            <CardTitle className="text-3xl font-semibold">$1,250.00</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-sm font-medium border rounded-md px-2 py-0.5">
                                <TrendingUp className="w-3 h-3" /> +12.5%
                            </span>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-1.5 text-sm">
                            <div className="flex gap-2 font-medium">
                                Trending up this month <TrendingUp className="w-4 h-4" />
                            </div>
                            <div className="text-muted-foreground">
                                Visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Card 2: New Customers */}
                    <Card className="flex flex-col justify-between shadow-sm bg-gradient-to-b from-card/80 to-muted">
                        <CardHeader>
                            <CardDescription className="text-base">ส่งซ่อม</CardDescription>
                            <CardTitle className="text-3xl font-semibold">1,234</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-sm font-medium border rounded-md px-2 py-0.5">
                                <TrendingDown className="w-3 h-3" /> -20%
                            </span>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-1.5 text-sm">
                            <div className="flex gap-2 font-medium">
                                Down 20% this period <TrendingDown className="w-4 h-4" />
                            </div>
                            <div className="text-muted-foreground">
                                Acquisition needs attention
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Card 3: Active Accounts */}
                    <Card className="flex flex-col justify-between shadow-sm bg-gradient-to-b from-card/80 to-muted">
                        <CardHeader>
                            <CardDescription className="text-base">จำหน่าย</CardDescription>
                            <CardTitle className="text-3xl font-semibold">45,678</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-sm font-medium border rounded-md px-2 py-0.5">
                                <TrendingUp className="w-3 h-3" /> +12.5%
                            </span>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-1.5 text-sm">
                            <div className="flex gap-2 font-medium">
                                Strong user retention <TrendingUp className="w-4 h-4" />
                            </div>
                            <div className="text-muted-foreground">
                                Engagement exceed targets
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Card 4: Growth Rate */}
                    <Card className="flex flex-col justify-between shadow-sm bg-gradient-to-b from-card/80 to-muted">
                        <CardHeader>
                            <CardDescription className="text-base">คงเหลือ</CardDescription>
                            <CardTitle className="text-3xl font-semibold">4.5%</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-sm font-medium border rounded-md px-2 py-0.5">
                                <TrendingUp className="w-3 h-3" /> +4.5%
                            </span>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-1.5 text-sm">
                            <div className="flex gap-2 font-medium">
                                Steady performance increase <TrendingUp className="w-4 h-4" />
                            </div>
                            <div className="text-muted-foreground">
                                Meets growth projections
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
