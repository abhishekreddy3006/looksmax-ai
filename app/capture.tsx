import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design/theme';
import { H1, Body, BodySmall } from '@/design/typography';
import { Button, Card } from '@/components/ui';
import { useAnalysisStore } from '@/store/analysisStore';
import { useProfileStore } from '@/store/profileStore';

export default function Capture() {
  const router = useRouter();
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const setAnalysis = useAnalysisStore((s) => s.setAnalysis);
  const setAnalyzing = useAnalysisStore((s) => s.setAnalyzing);
  const goals = useProfileStore((s) => s.goals);

  if (!permission) return <View style={{ flex: 1, backgroundColor: theme.colors.background }} />;

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background, justifyContent: 'center', padding: 20 }]}>
        <H1>Camera access needed</H1>
        <Body color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          We use your camera to capture photos for personalized appearance coaching. Your photos are private and encrypted.
        </Body>
        <Button title="Grant Permission" onPress={requestPermission} style={{ marginTop: 20 }} />
        <Button title="Use Gallery Instead" variant="secondary" onPress={pickFromGallery} style={{ marginTop: 12 }} />
      </View>
    );
  }

  async function pickFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      if (photo?.uri) {
        const manip = await ImageManipulator.manipulateAsync(photo.uri, [{ resize: { width: 1024 } }], { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG });
        setPhotoUri(manip.uri);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to take photo');
    }
  }

  async function analyze() {
    if (!photoUri) return;
    setIsUploading(true);
    setAnalyzing(true);

    try {
      const formData = new FormData();
      // @ts-ignore - React Native FormData
      formData.append('photo', {
        uri: photoUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);
      formData.append('goals', JSON.stringify(goals));
      formData.append('maintenance_tolerance', 'medium');
      formData.append('time_availability', '10');
      formData.append('budget', '$$');

      const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';
      // For web preview, use relative? Use current host
      const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:8000` : apiUrl;

      const res = await fetch(`${baseUrl}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const analysis = await res.json();
      setAnalysis(analysis);
      router.replace('/(tabs)/analysis');
    } catch (err: any) {
      console.error(err);
      // Fallback to mock for demo
      const mockAnalysis = {
        profile_summary: 'Balanced proportions with strong eye area and natural grooming baseline. Hair texture offers versatility, with opportunity to refine consistency for intentional presentation.',
        strengths: [
          { title: 'Eye Presentation', evidence: 'Clear, well-rested appearance', leverage: 'Keep natural brow grooming' },
          { title: 'Facial Symmetry', evidence: 'Balanced proportions', leverage: 'Maintain neutral expression' },
          { title: 'Hair Density', evidence: 'Good volume at crown', leverage: 'Versatile for textured styles' },
        ],
        opportunities: [
          { id: 'hair_texture', category: 'hair', title: 'Define Hair Texture', what: 'Use lightweight curl cream', why: 'Adds structure', how: 'Dime-sized to damp hair, scrunch', effort: 'low', timeline: 'Immediate', maintenance: 'low', impact: 'high' },
          { id: 'grooming_routine', category: 'grooming', title: '5-min Grooming Routine', what: 'Consistent morning routine', why: 'Intentional presentation', how: 'Cleanse, brow trim, lip balm', effort: 'low', timeline: '3-5 days', maintenance: 'low', impact: 'high' },
          { id: 'eyewear', category: 'style', title: 'Eyewear Fit', what: 'Try rectangular frames', why: 'Complements face shape', how: 'Visit optician', effort: 'medium', timeline: '1 visit', maintenance: 'low', impact: 'medium' },
        ],
        categories: {
          face_presentation: { status: 'good', notes: 'Neutral expression, good lighting' },
          hair: { status: 'opportunity', notes: 'Natural texture present' },
          grooming: { status: 'opportunity', notes: 'Good baseline' },
        },
        impact_map: { high: ['hair', 'grooming'], medium: ['style'], low: ['posture'] },
        confidence: 'medium',
        is_demo: true,
        provider: 'mock',
      };
      setAnalysis(mockAnalysis as any);
      router.replace('/(tabs)/analysis');
    } finally {
      setIsUploading(false);
      setAnalyzing(false);
    }
  }

  if (photoUri) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.previewHeader}>
          <H1>Review photo</H1>
          <BodySmall color={theme.colors.textSecondary}>Make sure lighting is good and face is centered</BodySmall>
        </View>
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        </View>
        <View style={[styles.footer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
          <Button title="Retake" variant="secondary" onPress={() => setPhotoUri(null)} />
          <Button title={isUploading ? 'Analyzing...' : 'Analyze'} loading={isUploading} onPress={analyze} style={{ flex: 1, marginLeft: 12 }} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="front">
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <BodySmall color="#FFF" style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 8 }}>
              Center face in oval • Natural light • Neutral expression
            </BodySmall>
          </View>
          <View style={styles.center}>
            <View style={[styles.oval, { borderColor: '#FFF' }]} />
          </View>
          <View style={styles.bottomBar}>
            <Button title="Gallery" variant="secondary" onPress={pickFromGallery} />
            <View style={[styles.shutterOuter, { borderColor: '#FFF' }]}>
              <View style={[styles.shutterInner, { backgroundColor: '#FFF' }]} />
            </View>
            <Button title="Capture" onPress={takePhoto} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'space-between' },
  topBar: { padding: 20, paddingTop: 60, alignItems: 'center' },
  center: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  oval: { width: 260, height: 340, borderRadius: 130, borderWidth: 2, borderStyle: 'dashed' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingBottom: 40 },
  shutterOuter: { width: 72, height: 72, borderRadius: 36, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  shutterInner: { width: 60, height: 60, borderRadius: 30 },
  previewHeader: { padding: 20, paddingTop: 60 },
  previewContainer: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  previewImage: { width: 300, height: 400, borderRadius: 20 },
  footer: { flexDirection: 'row', padding: 20, borderTopWidth: 1 },
});
