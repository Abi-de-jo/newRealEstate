'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Bell, ChevronDown, Plus, Home, Users, Book, Calendar, Settings, HelpCircle, X, Menu } from 'lucide-react';
import { useQuery } from 'react-query';
import { getAllAgents, getAllOwners, getAllPropertiesForAdmin } from '../../utils/api';
import AgentCard from './AgentCard';
import OwnerCard from './OwnerCard';
import ResCard from './ResCard';
import DashboardGraphs from './DashboardGraphs';
import { useTranslation } from 'react-i18next';
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal';
import axios from 'axios';

const navItems = [
  { icon: Home, label: 'dashboard' },
  { icon: Users, label: 'agents' },
  { icon: Book, label: 'owners' },
  { icon: Calendar, label: 'residency' },
  { icon: Settings, label: 'settings' },
];

export default function Dashboard() {
  const { t } = useTranslation('maincontent');
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [agentsData, setAgentsData] = useState([]);
  const [ownersData, setOwnersData] = useState([]);
  const [residenciesData, setResidenciesData] = useState([]);
  const [isNewAgentModalOpen, setIsNewAgentModalOpen] = useState(false);
  const [isNewOwnerModalOpen, setIsNewOwnerModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);

  const { data: agentsDataResponse, isError: agentsError, isLoading: agentsLoading } = useQuery('allAgents', getAllAgents);
  const { data: ownersDataResponse, isError: ownersError, isLoading: ownersLoading } = useQuery('allOwners', getAllOwners);
  const { data: residenciesDataResponse, isError: residenciesError, isLoading: residenciesLoading } = useQuery(
    'allresForAdmin',
    getAllPropertiesForAdmin
  );

  useEffect(() => {
    if (agentsDataResponse) setAgentsData(agentsDataResponse);
    if (ownersDataResponse) setOwnersData(ownersDataResponse);
    if (residenciesDataResponse) setResidenciesData(residenciesDataResponse);
  }, [agentsDataResponse, ownersDataResponse, residenciesDataResponse]);

  const handleAddAgent = useCallback(() => setIsNewAgentModalOpen(true), []);
  const handleAddOwner = useCallback(() => setIsNewOwnerModalOpen(true), []);
  const handleAddProperty = () => setIsAddPropertyModalOpen(true);

  const handleCreateAgent = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newAgent = {
        name: formData.get('name'),
        email: formData.get('email'),
        teleNumber: formData.get('phone'),
        username: formData.get('email').split('@')[0],
        image: '/placeholder.svg?height=100&width=100',
        governmentId: null,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/agent/register', newAgent);
        alert('Agent created successfully!');
        setAgentsData((prevData) => [...prevData, response.data]);
        setIsNewAgentModalOpen(false);
      } catch (error) {
        console.error('Error creating agent:', error);
        alert('Failed to create agent. Please try again.');
      }
    },
    []
  );

  const handleCreateOwner = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newOwner = {
        name: formData.get('name'),
        email: formData.get('email'),
        teleNumber: formData.get('phone'),
        username: formData.get('email').split('@')[0],
        image: '/placeholder.svg?height=100&width=100',
        governmentId: null,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/owner/register', newOwner);
        alert('Owner created successfully!');
        setOwnersData((prevData) => [...prevData, response.data]);
        setIsNewOwnerModalOpen(false);
      } catch (error) {
        console.error('Error creating Owner:', error);
        alert('Failed to create Owner. Please try again.');
      }
    },
    []
  );

  const renderCards = useCallback(
    (CardComponent, data) => {
      if (agentsLoading || ownersLoading || residenciesLoading) return <p className="text-gray-600">{t('loading')}</p>;
      if (agentsError || ownersError || residenciesError)
        return <p className="text-red-600">{t('error')}</p>;

      return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item) => (
            <CardComponent
              key={item.id}
              id={item.id}
              name={item.name}
              email={item.email}
              governmentId={item.governmentId}
              phone={item.teleNumber}
              username={item.username}
              image={item.image || '/placeholder.svg'}
              card={item}
            />
          ))}
        </div>
      );
    },
    [agentsLoading, ownersLoading, residenciesLoading, agentsError, ownersError, residenciesError, t]
  );

  const memoizedAgentCards = useMemo(() => renderCards(AgentCard, agentsData), [renderCards, agentsData]);
  const memoizedOwnerCards = useMemo(() => renderCards(OwnerCard, ownersData), [renderCards, ownersData]);
  const memoizedResidencyCards = useMemo(() => renderCards(ResCard, residenciesData), [renderCards, residenciesData]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      <aside className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white shadow-md fixed md:static inset-y-0 left-0 z-50 overflow-y-auto transition-all duration-300 ease-in-out`}>
        <div className="flex h-16 items-center justify-center border-b">
          <span className="text-2xl font-bold text-blue-600">DAVID</span>
        </div>
        <nav className="mt-6 px-4">
          <div className="flex flex-wrap md:flex-col">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveNavItem(item.label);
                  setIsSidebarOpen(false);
                }}
                className={`mb-2 flex items-center rounded-lg py-2 pl-2 text-left transition-colors duration-200 ${
                  activeNavItem === item.label ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                } w-auto md:w-full mr-2 md:mr-0`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="hidden md:inline">{t(item.label)}</span>
              </button>
            ))}
          </div>
        </nav>
        <div className="mt-auto p-4">
          <div className="rounded-lg bg-orange-100 p-4 shadow-inner">
            <h3 className="text-sm font-semibold text-orange-800">{t('needAssistance')}</h3>
            <p className="mt-1 text-xs text-orange-700">{t('contactSupport')}</p>
            <button className="mt-2 flex items-center text-sm font-medium text-orange-800 hover:underline">
              <HelpCircle className="mr-1 h-4 w-4" />
              {t('getSupport')}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex flex-col h-auto md:h-16 md:flex-row md:items-center justify-between border-b bg-white px-4 md:px-6 shadow-sm">
          <div className="flex items-center justify-between w-full md:w-auto">
            <button onClick={toggleSidebar} className="mr-4 md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">{t(activeNavItem)}</h1>
        <div className="w-full max-w-lg mx-auto">
  

        <div className="w-full max-w-[400px] mx-auto " >
  <nav className="flex overflow-x-auto justify-start -ml-28  space-x-4 px-4 py-3  rounded-lg shadow-sm md:hidden mt-32">
    {navItems.map((item) => (
      <button
        key={item.label}
        onClick={() => {
          setActiveNavItem(item.label);
          setIsSidebarOpen(false);
        }}
        className={`group flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-transform transform ${
          activeNavItem === item.label
            ? 'bg-blue-600 text-white scale-105 shadow-lg'
            : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-blue-600'
        }`}
        title={t(item.label)} // Tooltip for better accessibility
      >
        <item.icon
          className={`h-5 w-5 transition-transform ${
            activeNavItem === item.label ? 'scale-110 text-white' : 'text-gray-400 group-hover:text-blue-600'
          }`}
        />
        <span className="hidden sm:inline">{t(item.label)}</span> {/* Show label only on larger screens */}
      </button>
    ))}
  </nav>
</div>



</div>

            <div className="flex items-center space-x-4 md:hidden">
              <button
                className="rounded-full -ml-20 bg-gray-200 p-2 hover:bg-gray-300 transition-colors duration-200"
                aria-label={t('notifications')}
              >
                <Bell className="h-5 w-5  text-gray-600" />
              </button>
             
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="rounded-full border pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors duration-200"
              aria-label={t('notifications')}
            >
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <img src="/placeholder.svg" alt="User Avatar" className="h-8 w-8 rounded-full" />
              <span className="font-medium text-gray-700 hidden md:inline">{t('admin')}</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </div>
            <button
              className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200"
              onClick={handleAddProperty}
            >
              <Plus className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">{t('addProperty')}</span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {(activeNavItem === 'agents' || activeNavItem === 'owners' || activeNavItem === 'residency') && (
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                {t('all')} {t(activeNavItem)} (
                {activeNavItem === 'agents'
                  ? agentsData.length
                  : activeNavItem === 'owners'
                    ? ownersData.length
                    : residenciesData.length}
                )
              </h2>
              <button
                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto justify-center sm:justify-start"
                onClick={activeNavItem === 'agents' ? handleAddAgent : activeNavItem === 'owners' ? handleAddOwner : handleAddProperty}
              >
                <Plus className="mr-2 h-5 w-5" />
                <span>{t(`new ${activeNavItem.charAt(0).toUpperCase() + activeNavItem.slice(1)}`)}</span>
              </button>
            </div>
          )}
          {activeNavItem === "dashboard" && (
            <DashboardGraphs
              agentsData={agentsData}
              ownersData={ownersData}
              residenciesData={residenciesData}
              onCategoryClick={(category) => {
                setActiveNavItem(category);
              }}
            />
          )}

          {activeNavItem === 'agents' && memoizedAgentCards}
          {activeNavItem === 'owners' && memoizedOwnerCards}
          {activeNavItem === 'residency' && memoizedResidencyCards}
        </div>
      </main>

      <AddPropertyModal opened={isAddPropertyModalOpen} setOpened={setIsAddPropertyModalOpen} />

      {isNewAgentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{t('createAgent')}</h2>
              <button onClick={() => setIsNewAgentModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateAgent} className="space-y-6 bg-white rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{t(' ')}</h2>

              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t('Enter your name')}
                  required
                  className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="absolute top-8 left-3 text-gray-400">
                  <i className="fas fa-user"></i>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('Enter your email')}
                  required
                  className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="absolute top-8 left-3 text-gray-400">
                  <i className="fas fa-envelope"></i>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('password')}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={t('Enter your password')}
                  required
                  className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="absolute top-8 left-3 text-gray-400">
                  <i className="fas fa-lock"></i>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('phoneNumber')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t('Enter your phone number')}
                  required
                  className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="absolute top-8 left-3 text-gray-400">
                  <i className="fas fa-phone"></i>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition-all duration-300"
              >
                {t('create')}
              </button>
            </form>
          </div>
        </div>
      )}

      {isNewOwnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{t('createOwner')}</h2>
              <button onClick={() => setIsNewOwnerModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateOwner} className="space-y-6 bg-white rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{t('createOwner')}</h2>

              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t('Enter your name')}
                  required
                  className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="absolute top-8 left-3 text-gray-400">
                  <i className="fas fa-user"></i>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('Enter your email')}
                  required
                  className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="absolute top-8 left-3 text-gray-400">
                  <i className="fas fa-envelope"></i>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('phoneNumber')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t('Enter your phone number')}
                  required
                  className="block w-full pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="absolute top-8 left-3 text-gray-400">
                  <i className="fas fa-phone"></i>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition-all duration-300"
              >
                {t('create')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

