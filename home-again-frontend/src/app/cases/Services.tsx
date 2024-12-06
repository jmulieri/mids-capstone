import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel
} from "@/components/ui/select";
import {useEffect, useState} from "react";
import { serviceDictionary } from "@/types/serviceData.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {PencilIcon} from "lucide-react";
import {TrashIcon} from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";
import useUpdateCase from "@/hooks/useUpdateCase";

const Services = ({ initialServices, caseId, onServicesChange }: { initialServices: { serviceType: string; serviceCount: number }[], caseId: number | undefined, onServicesChange: (services: { serviceType: string; serviceCount: number }[]) => void }) => {

    const [services, setServices] = useState(initialServices);
    const [availableServices, setAvailableServices] = useState(Object.keys(serviceDictionary).sort());
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedService, setSelectedService] = useState("");
    const [serviceCount, setServiceCount] = useState(1);

    const { updateCase, loading } = useUpdateCase();

    const { toast } = useToast();

    const addService = () => {
        setIsEditing(false);
        setSelectedService("");
        setServiceCount(1);
        setIsDialogOpen(true);
    }

    const handleSaveService = () => {
        if (!selectedService) return;
        setIsEditing(false);
        const existingServiceIndex = services.findIndex((s) => s.serviceType === selectedService);
        if (existingServiceIndex !== -1) {
            const updatedServices = [...services];
            updatedServices[existingServiceIndex].serviceCount = serviceCount;
            setServices(updatedServices);
        } else {
            setServices([...services, { serviceType: selectedService, serviceCount }]);
        }
    };

    const editService = (serviceType: string, serviceCount: number) => {
        console.log("Edit service", serviceType, serviceCount);
        setIsEditing(true);
        setSelectedService(serviceType);
        setServiceCount(serviceCount);
        setIsDialogOpen(true);
    };

    const deleteService = (serviceType: string) => {
        console.log("Delete service", serviceType);
        setSelectedService(serviceType);
        setIsAlertDialogOpen(true);
    };

    const handleConfirmDelete = (serviceType: string) => {
        deleteService(selectedService);
        setServices(services.filter((s) => s.serviceType !== serviceType));
    }

    const persistServices = async () => {
        console.log("Persisting services", services);
        const response = await updateCase({ id: caseId, services });
        if (!response || !response.ok) {
            toast({title: "Error updating services", variant: "destructive"});
        } else {
            toast({title: "Services updated successfully"});
            onServicesChange(services);
        }
        setIsDialogOpen(false);
        setIsAlertDialogOpen(false);
    }

    useEffect(() => {
        if (isDialogOpen || isAlertDialogOpen) {
            persistServices();
        }
    }, [services]);

    useEffect(() => {
        setServices(initialServices);
    }, [initialServices]);

    useEffect(() => {
        const updatedAvailableServices = Object.keys(serviceDictionary).filter(
            (service) => !services.some((s) => s.serviceType === service)
        );
        setAvailableServices(updatedAvailableServices.sort());
    }, [services]);

    return (
        <Card className="w-full md:w-1/2 text-left">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="text-xl">Services Provided</CardTitle>
                <Button className="ml-auto" onClick={addService}>Add Service</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Services provided to participant</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Service Name</TableHead>
                            <TableHead className="text-center">Count</TableHead>
                            <TableHead className="text-right pr-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services && services.map((service: { serviceType: string; serviceCount: number }) => (
                            <TableRow key={service.serviceType}>
                                <TableCell className="font-medium">{serviceDictionary[service.serviceType]}</TableCell>
                                <TableCell className="text-center">{service.serviceCount}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" className="p-3 mr-1"
                                            onClick={() => editService(service.serviceType, service.serviceCount)}>
                                        <PencilIcon className="w-8 h-8"/>
                                    </Button>
                                    <Button variant="outline" className="p-3"
                                            onClick={() => deleteService(service.serviceType)}>
                                        <TrashIcon className="w-8 h-8"/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogTitle>Select Service</DialogTitle>
                    <DialogDescription>
                        {isEditing ? (
                            <div className="flex items-center text-left space-x-4 pt-4">
                                <Label className="w-1/3 pl-3">Selected Service</Label>
                                <div className="w-2/3">{serviceDictionary[selectedService]}</div>
                            </div>
                        ) : (
                            <Select value={selectedService} onValueChange={setSelectedService}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a service"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Service Type</SelectLabel>
                                        {availableServices.map((service) => (
                                            <SelectItem key={service} value={service}>
                                                {serviceDictionary[service]}
                                            </SelectItem>
                                        ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                        <div className="flex items-center text-left space-x-4 pt-4">
                            <Label className="w-1/3 pl-3" htmlFor="serviceCount">Service Count</Label>
                            <Input id="serviceCount" type="number" placeholder="ServiceCount" value={serviceCount} min={1}
                                   onChange={(e) => setServiceCount(Number(e.target.value))} className="w-2/3"/>
                        </div>
                    </DialogDescription>
                    <Button disabled={loading} onClick={handleSaveService}>Save Service</Button>
                </DialogContent>
            </Dialog>
            <AlertDialog open={isAlertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete service <b>{serviceDictionary[selectedService]}</b>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={loading}
                                           onClick={() => handleConfirmDelete(selectedService)}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
}

export default Services;