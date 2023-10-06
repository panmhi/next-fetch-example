'use client';
import Todos from '@/components/Todos/Todos';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <main className='flex w-full items-center justify-center py-10'>
      <Tabs
        defaultValue='todos'
        className=' w-[400px]'
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='todos'>Todos</TabsTrigger>
          <TabsTrigger value='other'>Other</TabsTrigger>
        </TabsList>
        {activeTab === 'todos' && (
          <TabsContent
            value='todos'
            className='rounded-lg border bg-card p-6 text-card-foreground shadow-sm'
          >
            <Todos />
          </TabsContent>
        )}
        {activeTab === 'other' && (
          <TabsContent value='other'>
            <div className='rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
              <p>
                When switch to this tab, NextJS automatically preventes the request made in the
                Todos tab being sended to the server. However, React doesn&apos;t do that/
              </p>
              {/* <p>
                When switch to this tab, even thougth the Todos tab has been unmounted, the resquest
                made in the Todos tab is still being sended to the server. And a toast message will
                pop up when the request is finished.
              </p>
              <p>
                To prevent unnecessary request in this case, we can add an AbortController to the
                useFetchTodos hook.
              </p> */}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </main>
  );
}
