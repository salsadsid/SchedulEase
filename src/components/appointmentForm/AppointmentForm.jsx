import { createAppointment } from "@/services/appointmentService";
import { createPromiseToast } from "@/utils/promiseToast";
import { appointmentSchema } from "@/utils/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Timestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const AppointmentForm = ({
  currentUserId,
  targetUserId,
  currentUserName,
  onSetAppointmentDialog,
}) => {
  const form = useForm({
    resolver: yupResolver(appointmentSchema),
  });
  const [submitError, setSubmitError] = useState("");
  const audioRef = useRef(null);
  // Assuming you have this in your auth context

  const onSubmit = async (values) => {
    const toast = createPromiseToast();
    const { successToast } = toast();
    setSubmitError("");
    const appointmentData = {
      title: values.title,
      description: values.description,
      date: new Date(values.date),
      time: values.time,
      schedulerId: currentUserId,
      schedulerName: currentUserName,
      holderId: targetUserId,
      createdAt: Timestamp.now(),
      status: "pending",
    };
    console.log("Schedule Mark 1:", appointmentData);
    console.log("Schedule Mark 2:", audioRef.current?.files[0]);
    try {
      const audioFile = audioRef.current?.files[0] || null;
      await createAppointment(appointmentData, audioFile);
      successToast({ message: "Appointment created successfully" });
      form.reset();
      onSetAppointmentDialog(false);
    } catch (error) {
      console.error("Error creating appointment:", error);
      setSubmitError("Failed to create appointment. Please try again.");
    }
  };

  return (
    <Card className="w-full mx-auto border-none ">
      <CardHeader>
        <DialogTitle className="font-semibold text-2xl">
          Create an appointment
        </DialogTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="audioMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio Message</FormLabel>
                  <FormControl>
                    <Input type="file" accept="audio/*" ref={audioRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {submitError && (
              <p className="text-red-500 text-xs">{submitError}</p>
            )}
            <Button type="submit" className="w-full">
              Create Appointment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
