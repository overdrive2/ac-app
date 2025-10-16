import AppLogoIcon from './app-logo-icon';
import AppLogoIcon3 from './app-logo-icon3';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <AppLogoIcon3 />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    AMS
                </span>
            </div>
        </>
    );
}
